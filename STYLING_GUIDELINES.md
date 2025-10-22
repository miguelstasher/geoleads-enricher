# Styling Guidelines - Prevent White-on-White Text Issues

## 🚨 CRITICAL RULE: Never apply broad CSS changes without checking background colors!

### ✅ SAFE APPROACH:
1. **Always check the background color first**
2. **Use specific selectors** (e.g., `.bg-white h1` instead of `h1`)
3. **Test changes on both navigation and main content**
4. **Ask before making broad changes**

### 🎯 COLOR RULES:

#### **WHITE BACKGROUNDS** → **DARK TEXT**
- `.bg-white` → `color: #111827`
- `main` content → `color: #111827`
- Form elements → `color: #111827`
- Placeholder text → `color: #374151`

#### **COLORED BACKGROUNDS** → **WHITE TEXT**
- Navigation bar → `color: white`
- `.bg-blue-600`, `.bg-blue-700` → `color: white`
- `.bg-gradient-to-r` → `color: white`
- Any colored background → `color: white`

### 🔧 CSS SELECTORS TO USE:

#### ✅ SAFE (Specific):
```css
.bg-white h1 { color: #111827 !important; }
main h1 { color: #111827 !important; }
nav h1 { color: white !important; }
```

#### ❌ DANGEROUS (Too Broad):
```css
h1 { color: #111827 !important; }  /* Affects navigation! */
* { color: #111827 !important; }   /* Affects everything! */
```

### 🛡️ PROTECTION RULES:

1. **Navigation Protection:**
   ```css
   nav, nav * { color: white !important; }
   ```

2. **Main Content Protection:**
   ```css
   main, main * { color: #111827 !important; }
   ```

3. **Form Protection:**
   ```css
   input, textarea, select, label { color: #111827 !important; }
   ```

### 📋 CHECKLIST BEFORE MAKING CHANGES:

- [ ] What background color is the element on?
- [ ] Am I using specific selectors?
- [ ] Will this affect the navigation bar?
- [ ] Will this affect colored backgrounds?
- [ ] Have I tested on both white and colored backgrounds?

### 🚨 EMERGENCY FIXES:

If white-on-white text appears:
1. **Check the background color**
2. **Use specific selectors**
3. **Add protection rules for navigation**
4. **Test immediately**

### 💡 REMEMBER:
- **White backgrounds** = **Dark text**
- **Colored backgrounds** = **White text**
- **Always be specific** with CSS selectors
- **Ask before making broad changes**
