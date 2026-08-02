/* @ds-bundle: {"format":4,"namespace":"DeskeeperAIDesignSystem_ec2f2e","components":[{"name":"Mascot","sourcePath":"components/brand/Mascot.jsx"},{"name":"MascotAside","sourcePath":"components/brand/MascotAside.jsx"},{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"FaqAccordion","sourcePath":"components/core/FaqAccordion.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"StepCard","sourcePath":"components/core/StepCard.jsx"},{"name":"WaitlistForm","sourcePath":"components/core/WaitlistForm.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"Nav","sourcePath":"components/navigation/Nav.jsx"},{"name":"ScoreCard","sourcePath":"components/product/ScoreCard.jsx"}],"sourceHashes":{"components/brand/Mascot.jsx":"550dba70437f","components/brand/MascotAside.jsx":"5742ecb200c9","components/brand/Wordmark.jsx":"f12c07ae3b60","components/core/Badge.jsx":"959091da2828","components/core/Button.jsx":"b2b6b35b9d2b","components/core/Eyebrow.jsx":"34368f207614","components/core/FaqAccordion.jsx":"8823b5ea8a0f","components/core/Input.jsx":"046dd1da324f","components/core/StepCard.jsx":"b13a710e28e3","components/core/WaitlistForm.jsx":"5a236213ff4e","components/navigation/Footer.jsx":"8f33ba0490c9","components/navigation/Nav.jsx":"a317a9f5e792","components/product/ScoreCard.jsx":"7fee8ab64166","ui_kits/landing/Sections.jsx":"f7cdda471624"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DeskeeperAIDesignSystem_ec2f2e = window.DeskeeperAIDesignSystem_ec2f2e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Mascot.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The Deskeeper meerkat (design.md §13). Six supplied poses, soft 3D-render style,
   transparent PNG. Colours are baked into the artwork and are never recoloured by the
   LP palette. Appears 3–4 times per page, maximum — nav, hero badge, footer.

   'desk' is a scene, not a bare pose: the meerkat at a desk watching a propped-up phone —
   the product in one image. Give it width, not a small mark slot.

   assetBase defaults to '../../assets/', which is correct for any page two levels deep
   (component cards, ui_kits/<kit>/, templates/<slug>/). Pass assetBase for other depths. */
/* 'flat' is the small-size silhouette (design.md 13) - use it at ~20px, where the 3D
   render's eyes and patches collapse into mud. 'watch' is the direct-eye-contact pose:
   the character noticing you. 'face' is the head crop for OG images and round avatars. */
const POSES = ['front', 'side', 'back', 'wave', 'think', 'cheer', 'desk', 'watch', 'flat', 'face', 'slump', 'proud'];
function Mascot({
  pose = 'front',
  size = 40,
  assetBase = '../../assets/',
  alt = '',
  style,
  ...rest
}) {
  /* Up to ~44px the flat silhouette reads better than the shrunken 3D render. */
  const wanted = size <= 44 && (pose === 'front' || pose === 'watch') ? 'flat' : pose;
  const p = POSES.includes(wanted) ? wanted : 'front';
  return /*#__PURE__*/React.createElement("img", _extends({
    src: `${assetBase}mascot-${p}.png`,
    alt: alt,
    "aria-hidden": alt ? undefined : true,
    style: {
      height: size,
      width: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
      display: 'block',
      objectFit: 'contain',
      /* The artwork ships without its original white cast shadow; depth comes back as a
         soft shadow in the page's own Evergreen, so the character sits in the room
         instead of looking pasted on. */
      filter: `drop-shadow(0 ${Math.round(size * 0.05)}px ${Math.round(size * 0.09)}px rgba(2,22,23,.55))`,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Mascot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Mascot.jsx", error: String((e && e.message) || e) }); }

// components/brand/MascotAside.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The meerkat as a character, not an icon: a pose plus one short line in its own voice.
   Voice rule (design.md §13): strict, but never looking down on you — it notices, it
   doesn't nag, it is never sarcastic. One line only; if it needs two, it isn't the
   mascot's line, it's body copy. */
function MascotAside({
  pose = 'front',
  size = 108,
  side = 'left',
  children,
  style,
  ...rest
}) {
  const bubble = /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 320,
      background: 'var(--panel)',
      border: '1px solid var(--divider)',
      borderRadius: 'var(--radius-l)',
      padding: '16px 20px',
      font: '500 var(--body-s-size)/var(--body-s-lh) var(--font-body)',
      color: 'var(--ink)',
      textWrap: 'pretty'
    }
  }, children, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      top: '50%',
      marginTop: -7,
      [side === 'left' ? 'left' : 'right']: -7,
      width: 12,
      height: 12,
      background: 'var(--panel)',
      borderLeft: '1px solid var(--divider)',
      borderBottom: '1px solid var(--divider)',
      transform: side === 'left' ? 'rotate(45deg)' : 'rotate(-135deg)'
    }
  }));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      flexDirection: side === 'left' ? 'row' : 'row-reverse',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Mascot, {
    pose: pose,
    size: size
  }), bubble);
}
Object.assign(__ds_scope, { MascotAside });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/MascotAside.jsx", error: String((e && e.message) || e) }); }

// components/brand/Wordmark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* NO logo or mascot artwork was supplied with design.md, so the brand mark is set in
   plain type: Bricolage Grotesque 800. `slot` renders whatever mascot asset the brand
   later provides (design.md §13 — 3D render at large sizes, flat silhouette at ~20px).
   Do not draw a substitute mascot. */
function Wordmark({
  size = 'm',
  slot,
  color = 'var(--ink)',
  style,
  ...rest
}) {
  const px = size === 'l' ? 30 : size === 's' ? 17 : 22;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      ...style
    }
  }, rest), slot ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: px + 4,
      height: px + 4,
      alignItems: 'center'
    }
  }, slot) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `800 ${px}px/1 var(--font-display)`,
      letterSpacing: '-0.015em',
      color
    }
  }, "Deskeeper ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--sub)'
    }
  }, "AI")));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* design.md §11 — Vanilla Custard badge. --warm is the rarest colour in the system:
   3–4 appearances per page, maximum. */
function Badge({
  children,
  icon,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      background: 'var(--badge-bg)',
      border: '1px solid var(--badge-border)',
      color: 'var(--warm)',
      borderRadius: 'var(--radius-pill)',
      padding: '6px 14px',
      font: '700 var(--badge-size)/var(--badge-lh) var(--font-body)',
      letterSpacing: 'var(--badge-ls)',
      textTransform: 'uppercase',
      ...style
    }
  }, rest), icon, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* design.md §11 — Primary CTA MUST carry the 1px --cta-border outline (§5.3):
   the Tomato Jam fill sits at 2.90 contrast against --base and would otherwise
   sink into the page. Never ship a borderless Tomato Jam button. */
function Button({
  variant = 'primary',
  size = 'm',
  as = 'button',
  href,
  disabled,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const pad = size === 'l' ? '15px 28px' : size === 's' ? '9px 18px' : '13px 24px';
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    font: `${size === 's' ? '700 13px' : '700 var(--body-s-size)'}/1.2 var(--font-body)`,
    padding: pad,
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: '1px solid transparent',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    opacity: disabled ? 0.45 : 1,
    transition: `background ${'var(--dur-hover)'} var(--ease-hover), box-shadow var(--dur-hover) var(--ease-hover), color var(--dur-hover) var(--ease-hover), border-color var(--dur-hover) var(--ease-hover), transform var(--dur-press) var(--ease-press)`,
    transform: press && !disabled ? 'scale(.97)' : 'none'
  };
  const variants = {
    primary: {
      background: hover && !disabled ? 'var(--cta-hover)' : 'var(--cta)',
      borderColor: 'var(--cta-border)',
      color: 'var(--ink)',
      boxShadow: hover && !disabled ? 'var(--glow-hover)' : 'none'
    },
    ghost: {
      background: 'transparent',
      borderColor: hover && !disabled ? 'var(--bright)' : 'var(--border)',
      color: hover && !disabled ? 'var(--bright)' : 'var(--ink)'
    },
    quiet: {
      background: 'transparent',
      borderColor: 'transparent',
      color: hover ? 'var(--ink)' : 'var(--sub)'
    }
  };
  const Tag = as === 'a' ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: as === 'a' ? href : undefined,
    disabled: Tag === 'button' ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* design.md §6.2 'label' scale — Inter Tight 900, 0.08em, uppercase, --sub. */
function Eyebrow({
  children,
  tone = 'sub',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      font: `900 var(--label-size)/var(--label-lh) var(--font-num)`,
      letterSpacing: 'var(--label-ls)',
      textTransform: 'uppercase',
      color: tone === 'warm' ? 'var(--warm)' : tone === 'bright' ? 'var(--bright)' : 'var(--sub)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/FaqAccordion.jsx
try { (() => {
/* design.md §11 — divider-ruled list; the "+" rotates 45° into an "×". 300ms ease. */
function Row({
  q,
  a,
  open,
  onToggle
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--divider)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-4)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '20px 0',
      textAlign: 'left',
      font: '800 var(--display-s-size)/var(--display-s-lh) var(--font-display)',
      color: hover || open ? 'var(--bright)' : 'var(--ink)',
      transition: 'color var(--dur-hover) var(--ease-hover)'
    }
  }, /*#__PURE__*/React.createElement("span", null, q), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '0 0 auto',
      width: 24,
      height: 24,
      display: 'grid',
      placeItems: 'center',
      font: '400 22px/1 var(--font-body)',
      color: open ? 'var(--bright)' : 'var(--sub)',
      transform: open ? 'rotate(45deg)' : 'none',
      transition: 'transform var(--dur-accordion) var(--ease-accordion), color var(--dur-hover) var(--ease-hover)'
    }
  }, "+")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateRows: open ? '1fr' : '0fr',
      transition: 'grid-template-rows var(--dur-accordion) var(--ease-accordion)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      paddingBottom: open ? 20 : 0,
      maxWidth: 640,
      font: '500 var(--body-s-size)/var(--body-s-lh) var(--font-body)',
      color: 'var(--sub)',
      textWrap: 'pretty'
    }
  }, a))));
}
function FaqAccordion({
  items = [],
  defaultOpen = -1
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--divider)'
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement(Row, {
    key: i,
    q: it.q,
    a: it.a,
    open: open === i,
    onToggle: () => setOpen(open === i ? -1 : i)
  })));
}
Object.assign(__ds_scope, { FaqAccordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/FaqAccordion.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* design.md §11 — email input: --panel fill, MEANINGFUL 1px --border (never --divider),
   pill radius, 14px 20px padding, --glow-focus ring on focus. */
function Input({
  type = 'email',
  placeholder = 'your@email.com',
  invalid,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    placeholder: placeholder,
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      background: 'var(--panel)',
      color: 'var(--ink)',
      border: `1px solid ${invalid ? 'var(--cta-border)' : 'var(--border)'}`,
      borderRadius: 'var(--radius-pill)',
      padding: '14px 20px',
      font: '500 var(--body-s-size)/1.2 var(--font-body)',
      outline: 'none',
      width: '100%',
      minWidth: 0,
      boxShadow: focus ? 'var(--glow-focus)' : 'none',
      transition: 'box-shadow var(--dur-hover) var(--ease-hover)',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/StepCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* design.md §11 Card/Step — --panel fill, 1px --divider (decorative edge, this card
   is not pressable), --radius-l, 24px padding. Numeral → heading → body. */
function StepCard({
  number,
  title,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: hover ? 'var(--panel2)' : 'var(--panel)',
      border: '1px solid var(--divider)',
      borderRadius: 'var(--radius-l)',
      padding: 'var(--card-pad)',
      display: 'grid',
      gap: 'var(--space-3)',
      alignContent: 'start',
      transition: 'background var(--dur-hover) var(--ease-hover)',
      ...style
    }
  }, rest), number && /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    tone: "warm"
  }, number), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: '800 var(--display-s-size)/var(--display-s-lh) var(--font-display)',
      color: 'var(--ink)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '500 var(--body-s-size)/var(--body-s-lh) var(--font-body)',
      color: 'var(--sub)',
      textWrap: 'pretty'
    }
  }, children));
}
Object.assign(__ds_scope, { StepCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StepCard.jsx", error: String((e && e.message) || e) }); }

// components/core/WaitlistForm.jsx
try { (() => {
/* design.md §11 — Input + Primary side by side inside one pill container (desktop),
   stacked under 520px. Max width 440px. On submit the form is REPLACED in place by a
   success message — never a page transition. */
function WaitlistForm({
  buttonLabel = 'Notify me',
  microcopy,
  stacked = false,
  onSubmit,
  successMessage = "You're on the list. We'll email you once — the day it's ready."
}) {
  const [email, setEmail] = React.useState('');
  const [done, setDone] = React.useState(false);
  const submit = e => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setDone(true);
    onSubmit && onSubmit(email);
  };
  if (done) return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--form-max)',
      width: '100%',
      background: 'var(--panel)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-l)',
      padding: 'var(--card-pad)',
      display: 'flex',
      gap: 'var(--space-4)',
      alignItems: 'center',
      textAlign: 'left'
    }
  }, __ds_scope.Mascot ? /*#__PURE__*/React.createElement(__ds_scope.Mascot, {
    pose: "proud",
    size: 84,
    style: {
      flex: '0 0 auto'
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 var(--display-s-size)/var(--display-s-lh) var(--font-display)',
      color: 'var(--warm)'
    }
  }, "You're in."), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 var(--body-s-size)/var(--body-s-lh) var(--font-body)',
      color: 'var(--sub)'
    }
  }, successMessage)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--form-max)',
      width: '100%',
      display: 'grid',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      display: stacked ? 'grid' : 'flex',
      gap: stacked ? 'var(--space-3)' : 'var(--space-2)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
    value: email,
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    type: "submit",
    style: stacked ? {
      width: '100%'
    } : undefined
  }, buttonLabel)), microcopy && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '500 var(--body-xs-size)/var(--body-xs-lh) var(--font-body)',
      color: 'var(--sub)'
    }
  }, microcopy));
}
Object.assign(__ds_scope, { WaitlistForm });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/WaitlistForm.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* design.md §14.8 — mascot + wordmark, and two links. Nothing more. */
function Footer({
  links = [{
    label: 'X / Twitter',
    href: '#'
  }, {
    label: 'Privacy',
    href: '#'
  }],
  mascot = __ds_scope.Mascot ? /*#__PURE__*/React.createElement(__ds_scope.Mascot, {
    size: 30
  }) : null,
  note,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("footer", _extends({
    style: {
      borderTop: '1px solid var(--divider)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: 'var(--space-8) var(--page-margin)',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    slot: mascot
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 'var(--space-6)'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href,
    style: {
      font: '500 var(--body-xs-size)/var(--body-xs-lh) var(--font-body)',
      color: 'var(--sub)',
      textDecoration: 'none'
    }
  }, l.label)))), note && /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '0 var(--page-margin) var(--space-8)',
      font: '500 var(--body-xs-size)/var(--body-xs-lh) var(--font-body)',
      color: 'var(--sub)',
      opacity: .7
    }
  }, note));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Nav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* design.md §11 Nav — sticky, backdrop blur 10px, rgba(4,42,43,.75), --divider underline.
   Mascot + wordmark left, single primary CTA right. Nothing else. */
function Nav({
  ctaLabel = 'Join the Waitlist',
  onCta,
  mascot = __ds_scope.Mascot ? /*#__PURE__*/React.createElement(__ds_scope.Mascot, {
    size: 38
  }) : null,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'var(--nav-bg)',
      backdropFilter: 'var(--nav-blur)',
      WebkitBackdropFilter: 'var(--nav-blur)',
      borderBottom: '1px solid var(--divider)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '16px var(--page-margin)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    slot: mascot
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "s",
    onClick: onCta
  }, ctaLabel)));
}
Object.assign(__ds_scope, { Nav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Nav.jsx", error: String((e && e.message) || e) }); }

// components/product/ScoreCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* design.md §12 — CRITICAL: product imagery uses the APP palette (--app-base #0A0C10,
   --app-warm-1/2 amber, --app-ink), NOT the LP marketing palette. Recolouring this to
   Evergreen/Neon Ice would lie about what the app actually looks like. */
function ScoreCard({
  score = 87,
  duration = '2h 14m',
  subject = 'Math',
  label = 'Deskeeper',
  mascot = __ds_scope.Mascot ? /*#__PURE__*/React.createElement(__ds_scope.Mascot, {
    size: 20
  }) : null,
  footnote = 'Actual app colors.',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", _extends({
    style: {
      margin: 0,
      display: 'grid',
      gap: 'var(--space-3)',
      justifyItems: 'center',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: 270,
      aspectRatio: '9 / 16',
      background: 'var(--app-base)',
      borderRadius: 'var(--radius-l)',
      boxShadow: 'var(--shadow-card)',
      border: '1px solid rgba(255,255,255,.06)',
      overflow: 'hidden',
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
      padding: 'var(--space-6)',
      gap: 'var(--space-4)'
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)'
    }
  }, mascot, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 13px/1 var(--font-body)',
      color: 'var(--app-ink)',
      letterSpacing: '-0.01em'
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      alignContent: 'center',
      justifyItems: 'center',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 64px/1 var(--font-num)',
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '-0.03em',
      background: 'linear-gradient(100deg,var(--app-warm-1),var(--app-warm-2))',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent'
    }
  }, score), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 11px/1 var(--font-num)',
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: 'rgba(237,239,243,.55)'
    }
  }, "/ 100 focus"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: 8,
      borderRadius: 999,
      background: 'rgba(255,255,255,.08)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${score}%`,
      height: '100%',
      borderRadius: 999,
      background: 'linear-gradient(90deg,var(--app-warm-1),var(--app-warm-2))'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 14px/1 var(--font-num)',
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--app-ink)',
      textAlign: 'center'
    }
  }, duration, " \xB7 ", subject)), footnote && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      font: '500 var(--body-xs-size)/var(--body-xs-lh) var(--font-body)',
      color: 'var(--sub)'
    }
  }, footnote));
}
Object.assign(__ds_scope, { ScoreCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/ScoreCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Sections.jsx
try { (() => {
/* Deskeeper AI waitlist LP — section composition (design.md §14).
   Copy is verbatim from the confirmed English draft; do not paraphrase. */
const DS = window.DeskeeperAIDesignSystem_ec2f2e || {};
const {
  Nav,
  Footer,
  Wordmark,
  Button,
  Badge,
  Eyebrow,
  StepCard,
  FaqAccordion,
  WaitlistForm,
  ScoreCard
} = DS;
/* Fail soft: decorative character never blanks the page if the bundle lags a rebuild. */
const MascotAside = DS.MascotAside || (() => null);
/* Decorative artwork must never be able to blank the page if the bundle lags a rebuild. */
const mascotIcon = props => DS.Mascot ? React.createElement(DS.Mascot, props) : null;
const CONTENT = {
  maxWidth: 'var(--content-max)',
  margin: '0 auto',
  padding: '0 var(--page-margin)'
};
function Reveal({
  children,
  delay = 0,
  style
}) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShown(true);
        io.disconnect();
      }
    }, {
      threshold: .15
    });
    io.observe(el);
    /* Safety net: never leave content invisible if the observer never fires. */
    const t = setTimeout(() => setShown(true), 2500);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      opacity: shown ? 1 : 0,
      transform: shown ? 'none' : 'translateY(16px)',
      transition: `opacity var(--dur-reveal) var(--ease-reveal) ${delay}ms, transform var(--dur-reveal) var(--ease-reveal) ${delay}ms`,
      ...style
    }
  }, children);
}
function Section({
  id,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    style: {
      padding: 'var(--section-gap) 0',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: CONTENT
  }, children));
}
function Hero({
  onJoin
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      minHeight: 'calc(100svh - 62px)',
      display: 'grid',
      alignItems: 'center',
      paddingTop: 'clamp(48px,5vw,88px)',
      paddingBottom: 'clamp(56px,6vw,104px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      top: -340,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 1500,
      height: 1060,
      background: 'var(--glow-hero)',
      opacity: 'var(--glow-hero-opacity)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 1000,
      margin: '0 auto',
      width: '100%',
      padding: '0 var(--page-margin)',
      display: 'grid',
      gap: 'var(--space-6)',
      justifyItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Badge, {
    icon: mascotIcon({
      size: 20
    })
  }, "Launching soon — iOS first")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 70
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '4px 0 0',
      maxWidth: '17ch',
      font: '900 var(--display-xl-size)/0.98 var(--font-display)',
      letterSpacing: '-0.035em',
      color: 'var(--ink)',
      textWrap: 'balance'
    }
  }, "Put your phone down. Get ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--bright)'
    }
  }, "watched"), ". Get proof.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 140
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px auto 0',
      maxWidth: '48ch',
      font: '500 var(--body-l-size)/1.55 var(--font-body)',
      color: 'var(--sub)',
      textWrap: 'pretty'
    }
  }, "Deskeeper AI turns your phone into a camera that watches you study — then hands you back a video worth posting.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 210,
    style: {
      marginTop: 'var(--space-4)',
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(WaitlistForm, {
    buttonLabel: "Notify me",
    microcopy: "No spam. One email when we launch. That's it.",
    onSubmit: onJoin
  }))));
}
function Problem() {
  return /*#__PURE__*/React.createElement(Section, {
    id: "problem"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dk-problem",
    style: {
      display: 'grid',
      gap: 'var(--block-gap-lg)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-6)',
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "The problem")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 70
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: '800 var(--display-m-size)/var(--display-m-lh) var(--font-display)',
      letterSpacing: 'var(--display-m-ls)',
      color: 'var(--ink)'
    }
  }, "You know the feeling.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 140
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '500 var(--body-m-size)/var(--body-m-lh) var(--font-body)',
      color: 'var(--sub)',
      textWrap: 'pretty'
    }
  }, "You sit down to study. Ten minutes later you're back on your phone. Not because you don't care — you just... slip. Every focus app tells you a number. None of them give you something you'd actually want to show someone."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 140,
    style: {
      justifySelf: 'center'
    }
  }, DS.Mascot ? /*#__PURE__*/React.createElement(DS.Mascot, {
    pose: "slump",
    size: 340,
    style: {
      height: 'auto',
      width: '100%',
      maxWidth: 460,
      WebkitMaskImage: 'linear-gradient(to bottom, #000 60%, rgba(0,0,0,.85) 88%, transparent 100%), linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%)',
      maskImage: 'linear-gradient(to bottom, #000 60%, rgba(0,0,0,.85) 88%, transparent 100%), linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%)',
      WebkitMaskComposite: 'source-in',
      maskComposite: 'intersect'
    }
  }) : null)));
}
const STEPS = [['01', 'Prop it up', 'Lean your phone against something on your desk, facing you.'], ['02', 'Get locked in', "The camera watches. Reach for your phone and it notices — you can't hide it from yourself anymore."], ['03', 'Get proof', 'When you\'re done, a video appears: your focus score, your time, stitched into 15 seconds.'], ['04', 'Post it', "Share it like any other study-with-me video. Except this one's real."]];
function HowItWorks() {
  return /*#__PURE__*/React.createElement(Section, {
    id: "how"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--block-gap-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "How it works")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 70
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: '800 var(--display-m-size)/var(--display-m-lh) var(--font-display)',
      letterSpacing: 'var(--display-m-ls)',
      color: 'var(--ink)'
    }
  }, "Prop it up, and it starts."))), /*#__PURE__*/React.createElement("div", {
    className: "dk-steps",
    style: {
      display: 'grid',
      gap: 'var(--space-4)'
    }
  }, STEPS.map(([n, t, b], i) => /*#__PURE__*/React.createElement(Reveal, {
    key: n,
    delay: i * 70
  }, /*#__PURE__*/React.createElement(StepCard, {
    number: n,
    title: t,
    style: {
      height: '100%'
    }
  }, b)))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 280
  }, /*#__PURE__*/React.createElement(MascotAside, {
    pose: "watch",
    size: 150
  }, "Reach for it and I'll notice. That's the whole deal."))));
}
function Showcase() {
  return /*#__PURE__*/React.createElement(Section, {
    id: "output"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dk-showcase",
    style: {
      display: 'grid',
      gap: 'var(--block-gap-lg)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-6)',
      maxWidth: 520
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "What comes out")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 70
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: '800 var(--display-m-size)/var(--display-m-lh) var(--font-display)',
      letterSpacing: 'var(--display-m-ls)',
      color: 'var(--ink)'
    }
  }, "See what you get at the end.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 140
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '500 var(--body-m-size)/var(--body-m-lh) var(--font-body)',
      color: 'var(--sub)',
      textWrap: 'pretty'
    }
  }, "What's left is a score, a time, and proof you sat there and did it.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 210
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      gap: 0,
      borderTop: '1px solid var(--divider)'
    }
  }, /*#__PURE__*/React.createElement("li", {
    style: {
      borderBottom: '1px solid var(--divider)',
      padding: '14px 0',
      display: 'grid',
      gap: 'var(--space-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 var(--display-s-size)/var(--display-s-lh) var(--font-display)',
      color: 'var(--ink)'
    }
  }, "On-device only"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 var(--body-s-size)/var(--body-s-lh) var(--font-body)',
      color: 'var(--sub)'
    }
  }, "Detection runs on your phone. Nothing is ever uploaded.")), /*#__PURE__*/React.createElement("li", {
    style: {
      borderBottom: '1px solid var(--divider)',
      padding: '14px 0',
      display: 'grid',
      gap: 'var(--space-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 var(--display-s-size)/var(--display-s-lh) var(--font-display)',
      color: 'var(--ink)'
    }
  }, "Faces covered by default"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 var(--body-s-size)/var(--body-s-lh) var(--font-body)',
      color: 'var(--sub)'
    }
  }, "Blurred, or replaced with an emoji, in every video.")), /*#__PURE__*/React.createElement("li", {
    style: {
      borderBottom: '1px solid var(--divider)',
      padding: '14px 0',
      display: 'grid',
      gap: 'var(--space-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 var(--display-s-size)/var(--display-s-lh) var(--font-display)',
      color: 'var(--ink)'
    }
  }, "No camera? Simple Mode"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 var(--body-s-size)/var(--body-s-lh) var(--font-body)',
      color: 'var(--sub)'
    }
  }, "Just a timer. You still get a video — a focus graph instead."))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 140,
    style: {
      justifySelf: 'center'
    }
  }, /*#__PURE__*/React.createElement(ScoreCard, {
    score: 87,
    duration: "2h 14m",
    subject: "Math"
  }))));
}
function WaitlistCta({
  onJoin,
  refEl
}) {
  return /*#__PURE__*/React.createElement("section", {
    ref: refEl,
    style: {
      padding: 'var(--section-gap) 0',
      borderTop: '1px solid var(--divider)',
      borderBottom: '1px solid var(--divider)',
      background: 'linear-gradient(180deg,var(--panel),var(--base))'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...CONTENT,
      display: 'grid',
      gap: 'var(--space-6)',
      justifyItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "warm"
  }, "Get in early")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 70
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: '800 var(--display-l-size)/var(--display-l-lh) var(--font-display)',
      letterSpacing: 'var(--display-l-ls)',
      color: 'var(--ink)'
    }
  }, "Be one of the first to try it.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 140
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: 560,
      font: '500 var(--body-m-size)/var(--body-m-lh) var(--font-body)',
      color: 'var(--sub)'
    }
  }, "We're finishing up before launch. Join the waitlist and we'll email you the moment it's ready.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 210,
    style: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(WaitlistForm, {
    buttonLabel: "Join the Waitlist",
    onSubmit: onJoin
  }))));
}
const FAQ = [{
  q: 'When does it launch?',
  a: 'We\'re targeting mid-August 2026. iOS first — Android after that.'
}, {
  q: 'Do I have to show my face?',
  a: 'No. By default, faces are blurred or replaced with an emoji in every video. All detection happens on your device — nothing is ever uploaded anywhere.'
}, {
  q: 'Is it free?',
  a: 'Yes — one session a day, with a watermark on the video. Pro removes the daily limit and shrinks the watermark.'
}, {
  q: 'What if I can\'t prop my phone up somewhere?',
  a: 'There\'s a Simple Mode — no camera, just a timer. You still get a video, just without the footage: a focus graph instead.'
}];
function Faq() {
  return /*#__PURE__*/React.createElement(Section, {
    id: "faq"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--block-gap)',
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: '800 var(--display-m-size)/var(--display-m-lh) var(--font-display)',
      letterSpacing: 'var(--display-m-ls)',
      color: 'var(--ink)'
    }
  }, "Questions.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 70
  }, /*#__PURE__*/React.createElement(FaqAccordion, {
    items: FAQ
  }))));
}
function LandingPage() {
  const ctaRef = React.useRef(null);
  const [joined, setJoined] = React.useState(false);
  const scrollToCta = () => ctaRef.current && window.scrollTo({
    top: ctaRef.current.offsetTop - 60,
    behavior: 'smooth'
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--base)',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement(Nav, {
    onCta: scrollToCta
  }), /*#__PURE__*/React.createElement(Hero, {
    onJoin: () => setJoined(true)
  }), /*#__PURE__*/React.createElement(Problem, null), /*#__PURE__*/React.createElement(HowItWorks, null), /*#__PURE__*/React.createElement(Showcase, null), /*#__PURE__*/React.createElement(WaitlistCta, {
    refEl: ctaRef,
    onJoin: () => setJoined(true)
  }), /*#__PURE__*/React.createElement(Faq, null), /*#__PURE__*/React.createElement(Footer, {
    note: joined ? "Thanks — you'll hear from us once." : null
  }));
}
Object.assign(window, {
  LandingPage,
  Hero,
  Problem,
  HowItWorks,
  Showcase,
  WaitlistCta,
  Faq,
  Reveal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Mascot = __ds_scope.Mascot;

__ds_ns.MascotAside = __ds_scope.MascotAside;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.FaqAccordion = __ds_scope.FaqAccordion;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.StepCard = __ds_scope.StepCard;

__ds_ns.WaitlistForm = __ds_scope.WaitlistForm;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Nav = __ds_scope.Nav;

__ds_ns.ScoreCard = __ds_scope.ScoreCard;

})();
