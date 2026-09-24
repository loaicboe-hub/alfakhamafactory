/**
 * AL FAKHAMA (HARV FRIES) - Products, Cut Explorer & Specs Modal
 */

const productSpecsData = {
  "shoestring-7mm": {
    en: {
      title: "Frozen Par-Fried Shoestring (7x7 mm)",
      cut: "7 mm x 7 mm",
      type: "IQF Frozen Par-Fried French Fries (Half-Fried)",
      fryTime: "2.5 – 3.0 minutes at 175°C (350°F)",
      ingredients: "Selected Potatoes, Vegetable Oil, Dextrose / Disodium Diphosphate",
      freezing: "Individually Quick Frozen (IQF) at -35°C",
      storage: "-18°C (0°F) or colder",
      packaging: "4 x 2.5 kg bags per carton / 10 x 1 kg bags per carton",
      yield: "High plate yield, fast preparation for high-rush foodservice",
      description: "Carefully calibrated 7mm shoestring cut par-fried fries. Engineered for rapid final frying in commercial pressure or open fryers, providing an ultra-crisp golden crust and minimal oil absorption."
    },
    ar: {
      title: "بطاطس نصف مقلية مجمدة رفيعة (7×7 مم)",
      cut: "7 مم × 7 مم",
      type: "بطاطس نصف مقلية مجمدة بتقنية IQF",
      fryTime: "2.5 – 3.0 دقائق على حرارة 175°م",
      ingredients: "بطاطس مختارة، زيت نباتي نقي، دكستروز / ثنائي فوسفات الصوديوم",
      freezing: "تجميد فردي سريع IQF عند -35°م",
      storage: "حفظ مجمد عند -18°م أو أقل",
      packaging: "4 أكياس × 2.5 كجم للكرتونة / 10 أكياس × 1 كجم",
      yield: "مردود عالي وتغطية ممتازة للطبق وسرعة تحضير فائقة",
      description: "تقطيع رفيع 7 مم محسوب بدقة ومقلي نصف قلية في زيوت نباتية. مصمم للقلي السريع في مطاعم الخدمة السريعة مع قرمشة فائقة ونسبة امتصاص منخفضة للزيت."
    }
  },
  "shoestring-6mm": {
    en: {
      title: "Frozen Par-Fried Shoestring (7x7 mm)",
      cut: "7 mm x 7 mm",
      type: "IQF Frozen Par-Fried French Fries (Half-Fried)",
      fryTime: "2.5 – 3.0 minutes at 175°C (350°F)",
      ingredients: "Selected Potatoes, Vegetable Oil, Dextrose / Disodium Diphosphate",
      freezing: "Individually Quick Frozen (IQF) at -35°C",
      storage: "-18°C (0°F) or colder",
      packaging: "4 x 2.5 kg bags per carton / 10 x 1 kg bags per carton",
      yield: "High plate yield, fast preparation for high-rush foodservice",
      description: "Carefully calibrated 7mm shoestring cut par-fried fries. Engineered for rapid final frying in commercial pressure or open fryers, providing an ultra-crisp golden crust and minimal oil absorption."
    },
    ar: {
      title: "بطاطس نصف مقلية مجمدة رفيعة (7×7 مم)",
      cut: "7 مم × 7 مم",
      type: "بطاطس نصف مقلية مجمدة بتقنية IQF",
      fryTime: "2.5 – 3.0 دقائق على حرارة 175°م",
      ingredients: "بطاطس مختارة، زيت نباتي نقي، دكستروز / ثنائي فوسفات الصوديوم",
      freezing: "تجميد فردي سريع IQF عند -35°م",
      storage: "حفظ مجمد عند -18°م أو أقل",
      packaging: "4 أكياس × 2.5 كجم للكرتونة / 10 أكياس × 1 كجم",
      yield: "مردود عالي وتغطية ممتازة للطبق وسرعة تحضير فائقة",
      description: "تقطيع رفيع 7 مم محسوب بدقة ومقلي نصف قلية في زيوت نباتية. مصمم للقلي السريع في مطاعم الخدمة السريعة مع قرمشة فائقة ونسبة امتصاص منخفضة للزيت."
    }
  },
  "classic-9mm": {
    en: {
      title: "Frozen Par-Fried Classic (9x9 mm)",
      cut: "9 mm x 9 mm",
      type: "IQF Frozen Par-Fried French Fries (Half-Fried)",
      fryTime: "3.5 – 4.0 minutes at 175°C (350°F)",
      ingredients: "Selected Potatoes, Vegetable Oil, Dextrose / Disodium Diphosphate",
      freezing: "Individually Quick Frozen (IQF) at -35°C",
      storage: "-18°C (0°F) or colder",
      packaging: "4 x 2.5 kg bags per carton / 5 x 2 kg bags per carton",
      yield: "Balanced portion control and superior heat retention",
      description: "The global benchmark for hotels and casual dining. 9x9mm cut delivers the ideal harmony between a golden crisp exterior and a fluffy, steaming potato interior."
    },
    ar: {
      title: "بطاطس نصف مقلية مجمدة كلاسيك (9×9 مم)",
      cut: "9 مم × 9 مم",
      type: "بطاطس نصف مقلية مجمدة بتقنية IQF",
      fryTime: "3.5 – 4.0 دقائق على حرارة 175°م",
      ingredients: "بطاطس مختارة، زيت نباتي نقي، دكستروز / ثنائي فوسفات الصوديوم",
      freezing: "تجميد فردي سريع IQF عند -35°م",
      storage: "حفظ مجمد عند -18°م أو أقل",
      packaging: "4 أكياس × 2.5 كجم للكرتونة / 5 أكياس × 2 كجم",
      yield: "توازن مثالي واحتفاظ ممتاز بالحرارة والقوام",
      description: "المعيار العالمي الأول لقطاع الفنادق والمطاعم. يوفر مقاس 9×9 مم التوازن المثالي بين القشرة الذهبية المقرمشة واللب الداخلي الطري الغني بمذاق البطاطس الطبيعي."
    }
  },
  "thick-12mm": {
    en: {
      title: "Frozen Par-Fried Thick Cut (12x12 mm)",
      cut: "12 mm x 12 mm",
      type: "IQF Frozen Par-Fried French Fries (Half-Fried)",
      fryTime: "4.5 – 5.5 minutes at 175°C (350°F)",
      ingredients: "Selected Potatoes, Vegetable Oil, Dextrose / Disodium Diphosphate",
      freezing: "Individually Quick Frozen (IQF) at -35°C",
      storage: "-18°C (0°F) or colder",
      packaging: "4 x 2.5 kg bags per carton / Custom Export Carton",
      yield: "Hearty plate presentation and extended heat retention",
      description: "Substantial 12x12mm cut designed for premium steakhouses, gourmet burger venues, and luxury room service catering requiring a distinctive handcrafted look."
    },
    ar: {
      title: "بطاطس نصف مقلية مجمدة سميكة (12×12 مم)",
      cut: "12 مم × 12 مم",
      type: "بطاطس نصف مقلية مجمدة بتقنية IQF",
      fryTime: "4.5 – 5.5 دقائق على حرارة 175°م",
      ingredients: "بطاطس مختارة، زيت نباتي نقي، دكستروز / ثنائي فوسفات الصوديوم",
      freezing: "تجميد فردي سريع IQF عند -35°م",
      storage: "حفظ مجمد عند -18°م أو أقل",
      packaging: "4 أكياس × 2.5 كجم للكرتونة / كراتين تصدير حسب الطلب",
      yield: "حضور بارز في الطبق واحتفاظ طويل بدرجة الحرارة",
      description: "تقطيع عريض 12×12 مم مخصص لمطاعم الستيك والبرجر الفاخر وقوائم الطعام الراقية التي تبحث عن مظهر غني ونكهة بطاطس طبيعية مركزة."
    }
  },
  "thick-10mm": {
    get en() { return productsData["thick-12mm"].en; },
    get ar() { return productsData["thick-12mm"].ar; }
  },
  "crinkle-wedges": {
    en: {
      title: "Frozen Par-Fried Crinkle Cut & Golden Wedges",
      cut: "Crinkle Cut & Seasoned Potato Wedges",
      type: "IQF Frozen Par-Fried French Fries (Half-Fried)",
      fryTime: "3.5 – 4.5 minutes at 175°C (350°F)",
      ingredients: "Selected Potatoes, Vegetable Oil, Dextrose / Disodium Diphosphate",
      freezing: "Individually Quick Frozen (IQF) at -35°C",
      storage: "-18°C (0°F) or colder",
      packaging: "4 x 2.5 kg bags per carton / 10 x 1 kg bags per carton",
      yield: "Enhanced crispy surface area, superior dip retention",
      description: "Fluted crinkle-cut fries with deep wavy ridges alongside savory potato wedges. Engineered for superior crispness, extended hold time, and generous dip and sauce adherence."
    },
    ar: {
      title: "بطاطس نصف مقلية مجمدة كرينكل زجزاج وويدجز ذهبية",
      cut: "تقطيع متعرج كرينكل وويدجز متبلة",
      type: "بطاطس نصف مقلية مجمدة بتقنية IQF",
      fryTime: "3.5 – 4.5 دقائق على حرارة 175°م",
      ingredients: "بطاطس مختارة، زيت نباتي نقي، دكستروز / ثنائي فوسفات الصوديوم",
      freezing: "تجميد فردي سريع IQF عند -35°م",
      storage: "حفظ مجمد عند -18°م أو أقل",
      packaging: "4 أكياس × 2.5 كجم للكرتونة / 10 أكياس × 1 كجم",
      yield: "قرمشة استثنائية وثبات عالي للحرارة واحتفاظ بالصلصات",
      description: "بطاطس كرينكل متعرجة الحواف مع أصابع ويدجز الذهبية. تتميز بمساحة سطح مقرمشة مضاعفة واحتفاظ ممتاز بالقرمشة لفترة طويلة بعد القلي مع تماسك استثنائي للغموس والصلصات."
    }
  },
  "crinkle-chips": {
    en: {
      title: "Frozen Par-Fried Crinkle Chips",
      cut: "Crinkle / Wavy Cut",
      type: "IQF Frozen Par-Fried French Fries (Half-Fried)",
      fryTime: "2.5 – 3.5 minutes at 175°C (350°F)",
      ingredients: "Selected Potatoes, Vegetable Oil, Dextrose / Disodium Diphosphate",
      freezing: "Individually Quick Frozen (IQF) at -35°C",
      storage: "-18°C (0°F) or colder",
      packaging: "4 x 2.5 kg bags per carton / 10 x 1 kg bags per carton",
      yield: "Ultra-crisp wavy surface area, ideal portioning for snacking & sides",
      description: "Golden crinkle-cut wavy chips, par-fried to a perfect half-cooked finish for maximum crispness on final fry — ideal for snacking, foodservice, and export."
    },
    ar: {
      title: "بطاطس كرنكل شيبسي نصف مقلية مجمدة",
      cut: "تقطيع متعرج كرنكل شيبسي",
      type: "بطاطس نصف مقلية مجمدة بتقنية IQF",
      fryTime: "2.5 – 3.5 دقائق على حرارة 175°م",
      ingredients: "بطاطس مختارة، زيت نباتي نقي، دكستروز / ثنائي فوسفات الصوديوم",
      freezing: "تجميد فردي سريع IQF عند -35°م",
      storage: "حفظ مجمد عند -18°م أو أقل",
      packaging: "4 أكياس × 2.5 كجم للكرتونة / 10 أكياس × 1 كجم",
      yield: "سطح تموجات فائق القرمشة ومظهر عصري جذاب للأطباق",
      description: "شيبسي كرنكل ذهبي متعرج، مقلي نصف قلية بدرجة احترافية لأقصى قرمشة عند التحضير النهائي — مثالي للتصدير وقطاع الفودسيرفس."
    }
  },
  "mixed-vegetables": {
    en: {
      title: "IQF Frozen Mixed Vegetables & Peas",
      cut: "Garden Blend IQF (Green Peas, Corn, Diced Carrots, Green Beans)",
      type: "Individually Quick Frozen (IQF) Grade A Vegetables",
      fryTime: "Steam or Boil 3 – 5 minutes",
      ingredients: "100% Egyptian Farm Vegetables (Peas, Sweet Corn, Carrots, Cut Beans)",
      freezing: "Individually Quick Frozen (IQF) at -35°C",
      storage: "-18°C (0°F) or colder",
      packaging: "4 x 2.5 kg bags per carton / 10 x 1 kg retail bags",
      yield: "100% clean usable yield, zero preparation waste",
      description: "Harvested at peak tenderness from fertile Nile Delta soils, blanched gently, and flash-frozen at -35°C to preserve color, vitamin content, and crisp texture."
    },
    ar: {
      title: "خضروات مشكلة وبسلة مجمدة IQF",
      cut: "خلطة خضار الحديقة (بسلة، ذرة، جزر مكعبات، فاصوليا)",
      type: "خضروات مجمدة فردياً بتقنية IQF درجة أولى",
      fryTime: "طهي / بخار 3 – 5 دقائق",
      ingredients: "خضروات طازجة 100% منتقاة من مزارع الدلتا",
      freezing: "تجميد فردي سريع IQF عند -35°م",
      storage: "حفظ مجمد عند -18°م أو أقل",
      packaging: "4 أكياس × 2.5 كجم للكرتونة / 10 أكياس × 1 كجم",
      yield: "مردود صافي 100% بدون هدر أو تنظيف",
      description: "محصودة في أوج نضارتها، مفروزة ومسلوقة خفيفاً ومجمدة بتقنية IQF السريعة للحفاظ الكامل على اللون الزاهي والقيمة الغذائية والقرمشة الطبيعية."
    }
  },
  "egyptian-strawberries": {
    en: {
      title: "IQF Frozen Egyptian Strawberries",
      cut: "Whole Calibrated IQF (Festival / Fortuna / Sensation)",
      type: "Grade A IQF Frozen Fruit",
      fryTime: "Ready to use / Gradual Defrost",
      ingredients: "100% Selected Egyptian Strawberries",
      freezing: "Individually Quick Frozen (IQF) at -35°C",
      storage: "-18°C (0°F) or colder",
      packaging: "4 x 2.5 kg bags per carton / 10 x 1 kg bags",
      yield: "High Brix sweetness and firm cellular integrity",
      description: "World-famous Egyptian strawberries hand-picked at optimum ripeness, washed, sorted, and IQF flash-frozen to ensure maximum aromatic sweetness for bakeries, smoothies, and catering."
    },
    ar: {
      title: "فراولة مصرية فاخرة مجمدة IQF",
      cut: "حبات كاملة مدرجة الحجم (فستيفال / فورتونا)",
      type: "فواكه مجمدة سريعة IQF درجة أولى ممتازة",
      fryTime: "جاهزة للاستخدام / إذابة تدريجية",
      ingredients: "فراولة مصرية طبيعية 100% بدون مواد حافظة",
      freezing: "تجميد فردي سريع IQF عند -35°م",
      storage: "حفظ مجمد عند -18°م أو أقل",
      packaging: "4 أكياس × 2.5 كجم للكرتونة / 10 أكياس × 1 كجم",
      yield: "قوام متماسك ودرجة حلاوة وسكرية مرتفعة",
      description: "الفراولة المصرية الأشهر عالمياً مجمدة بتقنية IQF خلال ساعات من قطفها لضمان أعلى جودة لمصانع العصائر والحلويات والفنادق وسلاسل التوزيع العالمية."
    }
  },
  "mango-chunks": {
    en: {
      title: "IQF Frozen Mango Chunks & Slices",
      cut: "Diced 15x15 mm / Natural Slices",
      type: "Grade A IQF Frozen Fruit",
      fryTime: "Ready to use / Defrost",
      ingredients: "100% Natural Selected Egyptian Mangoes (Zebda / Naomy)",
      freezing: "Individually Quick Frozen (IQF) at -35°C",
      storage: "-18°C (0°F) or colder",
      packaging: "4 x 2.5 kg bags per carton / 10 x 1 kg bags",
      yield: "Rich tropical aroma, vibrant golden color",
      description: "Sun-ripened Egyptian mangoes carefully peeled, diced, and flash-frozen. Perfect for premium smoothies, dessert decorations, and food manufacturing."
    },
    ar: {
      title: "مكعبات وشرائح مانجو مجمدة IQF",
      cut: "مكعبات 15×15 مم / شرائح طبيعية",
      type: "فواكه مجمدة IQF درجة أولى",
      fryTime: "جاهزة للاستخدام / إذابة",
      ingredients: "مانجو مصرية طبيعية 100% (زبدية / نعومي)",
      freezing: "تجميد فردي سريع IQF عند -35°م",
      storage: "حفظ مجمد عند -18°م أو أقل",
      packaging: "4 أكياس × 2.5 كجم للكرتونة / 10 أكياس × 1 كجم",
      yield: "نكهة استوائية غنية ولون ذهبي طبيعي",
      description: "مانجو مصرية ناضجة مقشرة ومقطعة مكعبات ومجمدة فوراً للحفاظ على حلاوتها الطبيعية ونكهتها الفواحة."
    }
  }
};

let currentParentCategory = "frozen-vegetables";
let currentCutFilter = "all";

function initProducts() {
  initCategoryDropdown();
  initSubCutFilters();
  initSpecsModal();
  initNavbarDropdownLinks();

  // Initial filter application
  applyProductFilters();
}

function initCategoryDropdown() {
  const dropdownWrapper = document.getElementById("categoryDropdownWrapper");
  const triggerBtn = document.getElementById("catDropdownTrigger");
  const options = document.querySelectorAll(".cat-dropdown-option");
  const triggerIcon = document.getElementById("catTriggerIcon");
  const triggerLabel = document.getElementById("catTriggerLabel");

  if (!triggerBtn || !dropdownWrapper) return;

  // Toggle dropdown
  triggerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownWrapper.classList.toggle("open");
    const isOpen = dropdownWrapper.classList.contains("open");
    triggerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!dropdownWrapper.contains(e.target)) {
      dropdownWrapper.classList.remove("open");
      triggerBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Select option
  options.forEach(opt => {
    opt.addEventListener("click", () => {
      const catValue = opt.getAttribute("data-cat");
      selectCategory(catValue);
      dropdownWrapper.classList.remove("open");
      triggerBtn.setAttribute("aria-expanded", "false");
    });
  });
}

function selectCategory(catValue) {
  currentParentCategory = catValue;
  currentCutFilter = "all"; // Reset sub-cut filter

  // Update dropdown options active state
  const options = document.querySelectorAll(".cat-dropdown-option");
  options.forEach(o => {
    if (o.getAttribute("data-cat") === catValue) {
      o.classList.add("active");
    } else {
      o.classList.remove("active");
    }
  });

  // Update Trigger text and icon
  const triggerIcon = document.getElementById("catTriggerIcon");
  const triggerLabel = document.getElementById("catTriggerLabel");

  const catMeta = {
    "frozen-vegetables": {
      icon: "🥗",
      en: "Frozen Vegetables (All Half-Fried Potatoes & Veg)",
      ar: "الخضروات والبطاطس المجمدة (كافة المقاسات)"
    },
    "frozen-fruits": {
      icon: "🍓",
      en: "Frozen Fruits (IQF Strawberries, Mango & Pomegranate)",
      ar: "الفواكه المجمدة (فراولة، مانجو، رمان)"
    },
    "all": {
      icon: "🌐",
      en: "All Categories (Complete Export Catalog)",
      ar: "كافة الأقسام والمنتجات"
    }
  };

  const meta = catMeta[catValue] || catMeta["all"];
  const isArabic = document.documentElement.getAttribute("dir") === "rtl";

  if (triggerIcon) triggerIcon.textContent = meta.icon;
  if (triggerLabel) triggerLabel.textContent = isArabic ? meta.ar : meta.en;

  // Update sub-cut filters visibility
  updateSubCutFiltersUI();

  // Apply filters to cards
  applyProductFilters();
}

function updateSubCutFiltersUI() {
  const subFiltersContainer = document.getElementById("subCutFilters");
  if (!subFiltersContainer) return;

  const isArabic = document.documentElement.getAttribute("dir") === "rtl";

  // Reset active on all buttons
  subFiltersContainer.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  const allBtn = subFiltersContainer.querySelector('.filter-btn[data-filter="all"]');
  if (allBtn) allBtn.classList.add("active");

  if (currentParentCategory === "frozen-fruits") {
    subFiltersContainer.innerHTML = `
      <span class="sub-filter-title">${isArabic ? "الصنف المطلوب:" : "Fruit Selection:"}</span>
      <button class="filter-btn active" data-filter="all">${isArabic ? "كافة الفواكه" : "All Fruits"}</button>
      <button class="filter-btn" data-filter="strawberries">${isArabic ? "فراولة مجمدة" : "IQF Strawberries"}</button>
      <button class="filter-btn" data-filter="mango">${isArabic ? "مانجو مجمدة" : "IQF Mango Chunks"}</button>
    `;
  } else if (currentParentCategory === "frozen-vegetables") {
    subFiltersContainer.innerHTML = `
      <span class="sub-filter-title">${isArabic ? "مقاس التقطيع / الصنف:" : "Cut Profile / Item:"}</span>
      <button class="filter-btn active" data-filter="all">${isArabic ? "كافة البطاطس والخضار" : "All Cuts & Veg"}</button>
      <button class="filter-btn" data-filter="shoestring">${isArabic ? "تقطيع رفيع 7×7 مم" : "7x7mm Shoestring"}</button>
      <button class="filter-btn" data-filter="classic">${isArabic ? "تقطيع كلاسيك 9×9 مم" : "9x9mm Classic"}</button>
      <button class="filter-btn" data-filter="thick">${isArabic ? "تقطيع سميك 12×12 مم" : "12x12mm Steak Cut"}</button>
      <button class="filter-btn" data-filter="crinkle-wedges">${isArabic ? "كرينكل وويدجز" : "Crinkle & Wedges"}</button>
      <button class="filter-btn" data-filter="crinkle-chips">${isArabic ? "بطاطس كرنكل شيبسي" : "Crinkle Chips"}</button>
      <button class="filter-btn" data-filter="mixed-veg">${isArabic ? "خضار مشكل وبسلة" : "IQF Mixed Veg"}</button>
    `;
  } else {
    subFiltersContainer.innerHTML = `
      <span class="sub-filter-title">${isArabic ? "تصفية حسب:" : "Filter Selection:"}</span>
      <button class="filter-btn active" data-filter="all">${isArabic ? "كافة الأصناف" : "All Items"}</button>
      <button class="filter-btn" data-filter="shoestring">7x7mm Shoestring</button>
      <button class="filter-btn" data-filter="classic">9x9mm Classic</button>
      <button class="filter-btn" data-filter="thick">12x12mm Steak Cut</button>
      <button class="filter-btn" data-filter="crinkle-wedges">${isArabic ? "كرينكل وويدجز" : "Crinkle & Wedges"}</button>
      <button class="filter-btn" data-filter="crinkle-chips">${isArabic ? "بطاطس كرنكل شيبسي" : "Crinkle Chips"}</button>
      <button class="filter-btn" data-filter="mixed-veg">${isArabic ? "خضار مشكل" : "Mixed Veg"}</button>
      <button class="filter-btn" data-filter="strawberries">${isArabic ? "فراولة" : "Strawberries"}</button>
    `;
  }

  initSubCutFilterButtons();
}

function initSubCutFilters() {
  initSubCutFilterButtons();
}

function initSubCutFilterButtons() {
  const filterBtns = document.querySelectorAll("#subCutFilters .filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCutFilter = btn.getAttribute("data-filter");
      applyProductFilters();
    });
  });
}

let filterTransitionTimeout = null;
let isFirstFilterRun = true;

function applyProductFilters() {
  const grid = document.querySelector(".products-grid");
  const productCards = document.querySelectorAll(".product-card");
  if (!productCards.length) return;

  const updateCardVisibility = () => {
    productCards.forEach(card => {
      const parentCat = card.getAttribute("data-parent-category");
      const cut = card.getAttribute("data-category");

      const matchesParent = (currentParentCategory === "all") || (parentCat === currentParentCategory);
      const matchesCut = (currentCutFilter === "all") || (cut === currentCutFilter);

      // Clean inline styles to eliminate conflicting transitions
      card.style.opacity = "";
      card.style.transform = "";
      card.style.display = "";

      if (matchesParent && matchesCut) {
        card.classList.remove("card-hidden");
        card.classList.add("is-visible");
      } else {
        card.classList.add("card-hidden");
      }
    });
  };

  // Immediate layout on first load
  if (isFirstFilterRun) {
    isFirstFilterRun = false;
    updateCardVisibility();
    return;
  }

  // Cancel any pending transition if user clicks rapidly
  if (filterTransitionTimeout) clearTimeout(filterTransitionTimeout);

  // Smooth fade-out to 0 to completely conceal grid item repositioning
  if (grid) grid.classList.add("filtering");

  filterTransitionTimeout = setTimeout(() => {
    updateCardVisibility();
    // Double requestAnimationFrame ensures browser completes layout before fading back in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (grid) grid.classList.remove("filtering");
      });
    });
  }, 120);
}

function initNavbarDropdownLinks() {
  const navDropdown = document.getElementById("navProductsDropdown") || document.querySelector(".nav-item-dropdown");
  const navTrigger = document.getElementById("navProductsTrigger") || document.querySelector(".nav-dropdown-trigger");
  const navDropdownLinks = document.querySelectorAll(".nav-dropdown-link");

  if (navDropdown && navTrigger) {
    // Toggle dropdown on click
    navTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = navDropdown.classList.toggle("open");
      navTrigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close dropdown on click outside
    document.addEventListener("click", (e) => {
      if (!navDropdown.contains(e.target)) {
        navDropdown.classList.remove("open");
        navTrigger.setAttribute("aria-expanded", "false");
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        navDropdown.classList.remove("open");
        navTrigger.setAttribute("aria-expanded", "false");
      }
    });
  }

  navDropdownLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetCat = link.getAttribute("data-category");
      if (targetCat) {
        selectCategory(targetCat);
      }
      if (navDropdown) {
        navDropdown.classList.remove("open");
        if (navTrigger) navTrigger.setAttribute("aria-expanded", "false");
      }

      // Close mobile drawer if open
      const mobileDrawer = document.getElementById("mobileDrawer");
      const drawerBackdrop = document.getElementById("drawerBackdrop");
      const mobileToggle = document.getElementById("mobileMenuToggle");
      if (mobileDrawer && mobileDrawer.classList.contains("open")) {
        mobileDrawer.classList.remove("open");
        if (drawerBackdrop) drawerBackdrop.classList.remove("active");
        if (mobileToggle) mobileToggle.classList.remove("active");
        document.body.style.overflow = "";
      }

      // Scroll smoothly to products section only if not already viewing it
      const prodSection = document.getElementById("products");
      if (prodSection) {
        const rect = prodSection.getBoundingClientRect();
        if (rect.top < -120 || rect.top > 250) {
          prodSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
}

function initSpecsModal() {
  const modalBackdrop = document.getElementById("specsModal");
  if (!modalBackdrop) return;

  // Global close helper
  window.closeSpecsModal = function() {
    modalBackdrop.classList.remove("active");
  };

  // Direct event listener on close buttons
  const closeBtns = modalBackdrop.querySelectorAll("#closeSpecsModal, #modalClose, .modal-close-btn");
  closeBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.closeSpecsModal();
    });
  });

  // Delegated click handling on document for opening & closing
  document.addEventListener("click", (e) => {
    // Open specs modal
    const viewBtn = e.target.closest(".btn-view-specs");
    if (viewBtn) {
      e.preventDefault();
      const productId = viewBtn.getAttribute("data-product-id");
      openSpecsModal(productId);
      return;
    }

    // Close button click via delegation
    const closeBtn = e.target.closest("#closeSpecsModal, #modalClose, .modal-close-btn");
    if (closeBtn && modalBackdrop.contains(closeBtn)) {
      e.preventDefault();
      e.stopPropagation();
      window.closeSpecsModal();
      return;
    }

    // Backdrop click
    if (e.target === modalBackdrop) {
      window.closeSpecsModal();
    }
  });

  // Escape key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop.classList.contains("active")) {
      window.closeSpecsModal();
    }
  });
}

function openSpecsModal(productId) {
  const modalBackdrop = document.getElementById("specsModal");
  const lang = currentLang || "en";
  const data = productSpecsData[productId] ? productSpecsData[productId][lang] : null;

  if (!data) return;

  document.getElementById("modalProdTitle").textContent = data.title;
  document.getElementById("modalProdDesc").textContent = data.description;
  document.getElementById("modalSpecCut").textContent = data.cut;
  document.getElementById("modalSpecType").textContent = data.type;
  document.getElementById("modalSpecFryTime").textContent = data.fryTime;
  document.getElementById("modalSpecStorage").textContent = data.storage;
  document.getElementById("modalSpecPkg").textContent = data.packaging;
  document.getElementById("modalSpecYield").textContent = data.yield;

  modalBackdrop.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  applyAdminProductOrder();
  initProducts();
});

window.addEventListener("languageChanged", () => {
  selectCategory(currentParentCategory);
});

/**
 * Reads the admin-saved product order from localStorage and reorders
 * the DOM product cards on the home page to match.
 */
function applyAdminProductOrder() {
  try {
    const stored = localStorage.getItem("alfakhama_products");
    if (!stored) return;

    const adminProducts = JSON.parse(stored);
    if (!Array.isArray(adminProducts) || adminProducts.length === 0) return;

    const grid = document.querySelector(".products-grid");
    if (!grid) return;

    // Build a map: data-category slug → card element
    // Admin products have a "cut" or "name" field we can match to card data-category
    // Strategy: match by image filename keyword or by name keyword
    const cards = Array.from(grid.querySelectorAll(".product-card"));
    if (cards.length === 0) return;

    // Map each admin product to a card by matching known keywords
    const categoryKeywordMap = [
      { keywords: ["shoestring", "7mm", "6mm"],         dataCategory: "shoestring" },
      { keywords: ["classic", "9mm"],                   dataCategory: "classic" },
      { keywords: ["thick", "steak", "12mm", "10mm", "12x12"], dataCategory: "thick" },
      { keywords: ["crinkle chip", "crinkle chips", "chips", "شيبسي"], dataCategory: "crinkle-chips" },
      { keywords: ["crinkle", "wedge"],                 dataCategory: "crinkle-wedges" },
      { keywords: ["mixed veg", "peas", "garden"],      dataCategory: "mixed-veg" },
      { keywords: ["green bean"],                       dataCategory: "green-beans" },
      { keywords: ["okra"],                             dataCategory: "okra" },
      { keywords: ["molokhia"],                         dataCategory: "molokhia" },
      { keywords: ["strawberr"],                        dataCategory: "strawberries" },
      { keywords: ["mango"],                            dataCategory: "mango" },
    ];

    // Build a lookup: dataCategory → card element
    const cardMap = {};
    cards.forEach(card => {
      const cat = card.getAttribute("data-category");
      if (cat) cardMap[cat] = card;
    });

    // For each admin product (in order), find the matching card and re-append it
    const reordered = [];
    adminProducts.forEach(prod => {
      const nameLower = (prod.name || "").toLowerCase();
      for (const { keywords, dataCategory } of categoryKeywordMap) {
        if (keywords.some(kw => nameLower.includes(kw))) {
          if (cardMap[dataCategory] && !reordered.includes(cardMap[dataCategory])) {
            reordered.push(cardMap[dataCategory]);
            break;
          }
        }
      }
    });

    // Append any cards not matched (so nothing is lost)
    cards.forEach(card => {
      if (!reordered.includes(card)) reordered.push(card);
    });

    // Re-insert into DOM in new order
    reordered.forEach(card => grid.appendChild(card));
  } catch (e) {
    // Fail silently — home page still works without reordering
    console.warn("applyAdminProductOrder:", e);
  }
}
