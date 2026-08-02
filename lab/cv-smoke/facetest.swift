// facetest.swift — Vision framework 顔検出スモークテスト
// 目的: REPORT.md で未検証だった本命モデル(Apple Vision)が
//       GPU/ANEのある通常環境で動くか + 判定に必要な出力(顔の有無/pitch=下向き角)が取れるかの確認。
// 使い方: swiftc -O facetest.swift -o facetest && ./facetest <image...>

import Vision
import AppKit
import Foundation

let args = CommandLine.arguments
guard args.count > 1 else {
    print("usage: facetest <image...>")
    exit(1)
}

func detect(_ path: String, warm: Bool) {
    guard let img = NSImage(contentsOfFile: path),
          let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
        print("\(path): cannot load")
        return
    }
    let req = VNDetectFaceRectanglesRequest()
    let humanReq = VNDetectHumanRectanglesRequest()
    humanReq.upperBodyOnly = true
    let handler = VNImageRequestHandler(cgImage: cg, options: [:])
    let t0 = Date()
    do {
        try handler.perform([req, humanReq])
    } catch {
        print("\(path): ERROR \(error)")
        return
    }
    let ms = Date().timeIntervalSince(t0) * 1000
    guard warm else { return } // 1回目はモデルロード込みなので捨てる
    let faces = req.results ?? []
    let humans = humanReq.results ?? []
    let humanDesc = humans.map { String(format: "conf=%.2f", $0.confidence) }.joined(separator: ",")
    print("\(path)")
    print(String(format: "  faces=%d  humans=%d(%@)  inference=%.1fms", faces.count, humans.count, humanDesc, ms))
    for f in faces {
        let deg = { (n: NSNumber?) -> Double in (n?.doubleValue ?? .nan) * 180 / .pi }
        print(String(format: "  bbox(x=%.2f y=%.2f w=%.2f h=%.2f)  roll=%+.1f°  yaw=%+.1f°  pitch=%+.1f°  conf=%.2f",
                     f.boundingBox.origin.x, f.boundingBox.origin.y,
                     f.boundingBox.width, f.boundingBox.height,
                     deg(f.roll), deg(f.yaw), deg(f.pitch), f.confidence))
    }
}

for path in args.dropFirst() {
    detect(path, warm: false) // warm-up (モデル初期化)
    detect(path, warm: true)  // 実測
}
