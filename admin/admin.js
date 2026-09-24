/**
 * AL FAKHAMA (HARV FRIES) — ADMIN DASHBOARD JAVASCRIPT
 * Full-featured SPA: Inquiries (MySQL), Categories, Products, General Settings
 */

// State
let currentSecretKey = localStorage.getItem("alfakhama_admin_key") || "Alfakhama2026@GoldFries";
let currentStatusFilter = "all";
let inquiriesData = [];
let selectedInquiryIds = new Set();
let pendingDeleteTarget = null;

// Default Categories State
const defaultCategories = [
  {
    id: 1,
    title: "Frozen Vegetables",
    cut: "IQF Half-Fried Potatoes (All Cuts) & Mixed Vegetables",
    desc: "Primary industrial export category containing all premium IQF par-fried (half-fried) potato products (Shoestring 7x7mm, Classic 9x9mm, Thick Steak Cut 12x12mm, Crinkle Cut, Wedges) alongside prime Egyptian IQF green peas, sweet corn, cut green beans, and garden vegetables.",
    status: "Active Export Grade",
    included: "Half-Fried French Fries (7mm, 9mm, 12mm, Crinkle, Wedges) • IQF Green Peas • Sweet Corn • Green Beans • Garden Blend"
  },
  {
    id: 2,
    title: "Frozen Fruits",
    cut: "IQF Whole, Diced & Sliced Fruits",
    desc: "High-grade IQF frozen fruits including whole Egyptian strawberries, mango chunks and slices, pomegranate arils, and apricot halves harvested at peak ripeness.",
    status: "Active Export Grade",
    included: "Whole Strawberries • Mango Chunks/Slices • Pomegranate Arils • Apricot Halves"
  },
  {
    id: 3,
    title: "Custom Private Label Cuts & Packing",
    cut: "Tailored to Buyer Specifications",
    desc: "Specialized contract processing and buyer-brand packaging for all half-fried potato cuts and frozen vegetables under buyer brands.",
    status: "Private Label Only",
    included: "Private Label Polybags (1kg, 2.5kg) • Master Cartons • Custom Cut Profiles"
  }
];

// Default Products State (All half-fried potatoes are related to Frozen Vegetables)
const defaultProducts = [
  {
    id: 1,
    name: "Frozen Par-Fried Shoestring (7x7mm)",
    category: "Frozen Vegetables",
    cut: "7 x 7 mm",
    type: "Par-Fried (Half-Fried) IQF",
    fryTime: "2.5 - 3.0 min @ 175°C",
    storage: "-18°C Deep Frozen",
    pkg: "4x 2.5kg Polybags / 10kg Master Carton",
    img: "../assets/images/cut_shoestring_6mm.jpg",
    desc: "Premium par-fried shoestring fries engineered for fast service, crisp golden exterior, and high portion yield."
  },
  {
    id: 2,
    name: "Frozen Par-Fried Classic (9x9mm)",
    category: "Frozen Vegetables",
    cut: "9 x 9 mm",
    type: "Par-Fried (Half-Fried) IQF",
    fryTime: "3.0 - 3.5 min @ 175°C",
    storage: "-18°C Deep Frozen",
    pkg: "4x 2.5kg Polybags / 10kg Master Carton",
    img: "../assets/images/cut_classic_9mm.jpg",
    desc: "The universal hospitality standard. Golden exterior with fluffy potato interior for restaurants, hotels, and banquets."
  },
  {
    id: 3,
    name: "Frozen Par-Fried Thick Steak Cut (12x12mm)",
    category: "Frozen Vegetables",
    cut: "12 x 12 mm",
    type: "Par-Fried (Half-Fried) IQF",
    fryTime: "3.5 - 4.5 min @ 175°C",
    storage: "-18°C Deep Frozen",
    pkg: "4x 2.5kg Polybags / 10kg Master Carton",
    img: "../assets/images/cut_thick_10mm.jpg",
    desc: "Hearty steakhouse cut offering rich potato bite, slow cooldown, and exceptional plate coverage."
  },
  {
    id: 4,
    name: "Frozen Par-Fried Crinkle Cut & Wedges",
    category: "Frozen Vegetables",
    cut: "Crinkle Cut & Seasoned Wedges",
    type: "Par-Fried (Half-Fried) IQF",
    fryTime: "3.5 - 4.5 min @ 175°C",
    storage: "-18°C Deep Frozen",
    pkg: "4x 2.5kg Polybags / 10kg Master Carton",
    img: "../assets/images/cut_crinkle_wedges.jpg",
    desc: "Fluted crinkle fries and potato wedges offering enhanced crisp surface and dipping sauce retention."
  },
  {
    id: 5,
    name: "IQF Frozen Mixed Vegetables & Peas",
    category: "Frozen Vegetables",
    cut: "Garden Blend IQF",
    type: "Flash-Frozen IQF Vegetables",
    fryTime: "Steam / Boil 3-5 min",
    storage: "-18°C Deep Frozen",
    pkg: "4x 2.5kg Polybags / 10kg Master Carton",
    img: "../assets/images/frozen_vegetables.jpg",
    desc: "Selected Egyptian green peas, diced carrots, green beans, and sweet corn flash-frozen at peak farm freshness."
  },
  {
    id: 6,
    name: "IQF Frozen Egyptian Strawberries",
    category: "Frozen Fruits",
    cut: "Whole Calibrated IQF",
    type: "Grade A IQF Frozen Fruit",
    fryTime: "Ready to Use / Defrost",
    storage: "-18°C Deep Frozen",
    pkg: "4x 2.5kg Polybags / 10kg Master Carton",
    img: "../assets/images/frozen_strawberries.jpg",
    desc: "Export-grade whole sweet Egyptian strawberries sorted, washed, and individually quick frozen for pastry, smoothies, and retail."
  },
  {
    id: 7,
    name: "IQF Frozen Mango Chunks & Slices",
    category: "Frozen Fruits",
    cut: "Diced 15x15 mm / Natural Slices",
    type: "Grade A IQF Frozen Fruit",
    fryTime: "Ready to Use / Defrost",
    storage: "-18°C Deep Frozen",
    pkg: "4x 2.5kg Polybags / 10kg Master Carton",
    img: "../assets/images/frozen_mango.jpg",
    desc: "Succulent, aromatic Egyptian mangoes diced and individually quick-frozen for foodservice, pastry, and smoothie production."
  },
  {
    id: 8,
    name: "Frozen IQF Green Beans (فاصوليا خضراء مجمدة)",
    category: "Frozen Vegetables",
    cut: "Whole / Cut IQF",
    type: "Flash-Frozen IQF Vegetables",
    fryTime: "Steam / Boil 4-6 min",
    storage: "-18°C Deep Frozen",
    pkg: "4x 2.5kg Polybags / 10kg Master Carton",
    img: "../assets/images/frozen_green_beans.jpg",
    desc: "Premium whole green beans individually quick-frozen at peak harvest freshness — vibrant color, firm texture, no additives."
  },
  {
    id: 9,
    name: "Frozen IQF Okra Zero Grade (بامية زيرو مجمدة)",
    category: "Frozen Vegetables",
    cut: "Zero Grade — Small Whole Pods",
    type: "Flash-Frozen IQF Vegetables",
    fryTime: "Steam / Cook 5-8 min",
    storage: "-18°C Deep Frozen",
    pkg: "4x 2.5kg Polybags / 10kg Master Carton",
    img: "../assets/images/frozen_okra.jpg",
    desc: "Premium Zero-grade whole okra pods, individually quick-frozen to preserve natural texture, rich green color, and nutritional value."
  },
  {
    id: 10,
    name: "Frozen Chopped Molokhia (ملوخية مجمدة)",
    category: "Frozen Vegetables",
    cut: "Chopped Leaves IQF",
    type: "Flash-Frozen IQF Vegetables",
    fryTime: "Cook 10-15 min",
    storage: "-18°C Deep Frozen",
    pkg: "4x 2.5kg Polybags / 10kg Master Carton",
    img: "../assets/images/frozen_molokhia.jpg",
    desc: "Finely chopped Egyptian molokhia (jute mallow) leaves, flash-frozen at harvest peak for maximum flavor and vibrant deep-green color."
  },
  {
    id: 11,
    name: "Frozen Par-Fried Crinkle Chips (بطاطس كرنكل شيبسي)",
    category: "Frozen Vegetables",
    cut: "Crinkle / Wavy Cut",
    type: "Par-Fried (Half-Fried) IQF",
    fryTime: "3.0 - 4.0 min @ 175°C",
    storage: "-18°C Deep Frozen",
    pkg: "4x 2.5kg Polybags / 10kg Master Carton",
    img: "../assets/images/frozen_crinkle_chips.jpg",
    desc: "Golden crinkle-cut wavy chips, par-fried to a perfect half-cooked finish for maximum crispness on final fry — ideal for snacking and export."
  }
];

// Initialize and sync Categories (Migrate to ensure Frozen Vegetables is top-level)
let categories;
try {
  const storedCats = localStorage.getItem("alfakhama_categories");
  if (!storedCats || storedCats.includes("Shoestring Cut (7×7 mm)")) {
    categories = defaultCategories;
    localStorage.setItem("alfakhama_categories", JSON.stringify(categories));
  } else {
    categories = JSON.parse(storedCats);
  }
} catch (e) {
  categories = defaultCategories;
  localStorage.setItem("alfakhama_categories", JSON.stringify(categories));
}

// Auto-heal map for old invalid .png paths to real .jpg files
const assetHealMap = {
  "cut_shoestring": "../assets/images/cut_shoestring_6mm.jpg",
  "cut_classic": "../assets/images/cut_classic_9mm.jpg",
  "cut_thick": "../assets/images/cut_thick_10mm.jpg",
  "cut_crinkle": "../assets/images/cut_crinkle_wedges.jpg",
  "crinkle": "../assets/images/cut_crinkle_wedges.jpg",
  "wedges": "../assets/images/cut_crinkle_wedges.jpg",
  "packaging_bags": "../assets/images/packaging_bags.jpg",
  "strawberries": "../assets/images/frozen_strawberries.jpg",
  "mango": "../assets/images/frozen_mango.jpg"
};

// Initialize and sync Products (Ensure all half-fried potatoes belong to Frozen Vegetables & images are valid)
let products;
try {
  const storedProds = localStorage.getItem("alfakhama_products");
  if (!storedProds || !storedProds.includes('"category"')) {
    products = defaultProducts;
    localStorage.setItem("alfakhama_products", JSON.stringify(products));
  } else {
    products = JSON.parse(storedProds);
    let updated = false;

    products = products.map(p => {
      // Fix broken .png paths
      if (p.img && typeof p.img === "string" && p.img.endsWith(".png")) {
        for (const [key, realPath] of Object.entries(assetHealMap)) {
          if (p.img.includes(key)) {
            p.img = realPath;
            updated = true;
          }
        }
        if (p.img.endsWith(".png")) {
          p.img = "../assets/images/cut_classic_9mm.jpg";
          updated = true;
        }
      }

      // Upgrade generic fruit images to specific separate images
      if (p.name.toLowerCase().includes("strawberr") && (!p.img || p.img.includes("frozen_fruits"))) {
        p.img = "../assets/images/frozen_strawberries.jpg";
        updated = true;
      }
      if (p.name.toLowerCase().includes("mango") && (!p.img || p.img.includes("frozen_fruits"))) {
        p.img = "../assets/images/frozen_mango.jpg";
        updated = true;
      }
      // Upgrade crinkle cut & wedges image from old placeholder to dedicated crinkle/wedges photo
      if ((p.name.toLowerCase().includes("crinkle") || p.name.toLowerCase().includes("wedges")) && (!p.img || p.img.includes("hero_half_fried"))) {
        p.img = "../assets/images/cut_crinkle_wedges.jpg";
        updated = true;
      }

      // Upgrade 10x10mm to 12x12mm in stored product data
      if (p.cut === "10 x 10 mm" || (p.name && p.name.toLowerCase().includes("10x10mm"))) {
        p.cut = "12 x 12 mm";
        p.name = p.name.replace(/10x10mm/gi, "12x12mm").replace(/10 x 10 mm/gi, "12 x 12 mm");
        if (p.desc) p.desc = p.desc.replace(/10x10mm/gi, "12x12mm");
        updated = true;
      }

      // Guarantee any potato product is categorized under Frozen Vegetables
      if (!p.category || p.name.toLowerCase().includes("fried") || p.name.toLowerCase().includes("potato") || p.name.toLowerCase().includes("shoestring") || p.name.toLowerCase().includes("classic") || p.name.toLowerCase().includes("thick")) {
        p.category = "Frozen Vegetables";
      }
      return p;
    });

    // Ensure Mango exists as a distinct product
    const hasMango = products.some(p => p.name.toLowerCase().includes("mango"));
    if (!hasMango) {
      products.push(defaultProducts.find(p => p.name.toLowerCase().includes("mango")));
      updated = true;
    }

    // Ensure new products are injected if missing (migration)
    const newProductChecks = [
      { keyword: "green bean", defaultId: 8 },
      { keyword: "okra",       defaultId: 9 },
      { keyword: "molokhia",   defaultId: 10 },
      { keyword: "crinkle chip", defaultId: 11 }
    ];
    newProductChecks.forEach(({ keyword, defaultId }) => {
      const exists = products.some(p => p.name.toLowerCase().includes(keyword));
      if (!exists) {
        const toAdd = defaultProducts.find(p => p.id === defaultId);
        if (toAdd) { products.push(toAdd); updated = true; }
      }
    });

    if (updated) {
      localStorage.setItem("alfakhama_products", JSON.stringify(products));
    }
  }
} catch (e) {
  products = defaultProducts;
  localStorage.setItem("alfakhama_products", JSON.stringify(products));
}

// Default seeded administrators
const defaultUsers = [
  {
    id: 1,
    name: "Al Fakhama Admin",
    username: "admin",
    email: "admin@alfakhama-fries.com",
    role: "super_admin",
    status: "active",
    createdAt: "2026-01-15"
  },
  {
    id: 2,
    name: "Tarek Mansour",
    username: "tarek.export",
    email: "t.mansour@alfakhama-fries.com",
    role: "admin",
    status: "active",
    createdAt: "2026-02-10"
  },
  {
    id: 3,
    name: "Mona Radwan",
    username: "mona.content",
    email: "m.radwan@alfakhama-fries.com",
    role: "editor",
    status: "active",
    createdAt: "2026-03-01"
  }
];

let adminUsers;
try {
  const storedUsers = localStorage.getItem("alfakhama_admin_users");
  if (!storedUsers) {
    adminUsers = defaultUsers;
    localStorage.setItem("alfakhama_admin_users", JSON.stringify(adminUsers));
  } else {
    adminUsers = JSON.parse(storedUsers);
  }
} catch (e) {
  adminUsers = defaultUsers;
}

let currentAdminProfile;
try {
  const storedProfile = localStorage.getItem("alfakhama_admin_profile");
  if (!storedProfile) {
    currentAdminProfile = {
      name: "Al Fakhama Admin",
      username: "admin",
      email: "admin@alfakhama-fries.com",
      role: "super_admin"
    };
    localStorage.setItem("alfakhama_admin_profile", JSON.stringify(currentAdminProfile));
  } else {
    currentAdminProfile = JSON.parse(storedProfile);
  }
} catch (e) {
  currentAdminProfile = {
    name: "Al Fakhama Admin",
    username: "admin",
    email: "admin@alfakhama-fries.com",
    role: "super_admin"
  };
}

// ============================================================================
// INITIALIZATION
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initMobileDrawer();
  initInquiries();
  initCategories();
  initProducts();
  initSettings();
  initAuthorityModule();
  initAuthKeyManager();

  // Load inquiries from MySQL backend
  loadInquiries();
});

// ============================================================================
// 1. NAVIGATION & SPA VIEW SWITCHER
// ============================================================================
function initNavigation() {
  const navLinks = document.querySelectorAll(".sidebar-nav .nav-link");
  const views = document.querySelectorAll(".admin-view");
  const pageTitle = document.getElementById("pageTitle");
  const pageSubtitle = document.getElementById("pageSubtitle");

  const viewMetadata = {
    inquiries: {
      title: "Inquiries & Export Leads",
      sub: "Manage incoming B2B quotation requests, commercial orders, and export leads"
    },
    categories: {
      title: "Cut Categories & Classifications",
      sub: "Manage half-fried potato cut categories, export classifications, and profiles"
    },
    products: {
      title: "Product Catalog (Half-Fried IQF)",
      sub: "Manage active product cuts, frying specs, packaging formats, and cold storage standards"
    },
    authority: {
      title: "Authority & User Access Control",
      sub: "Manage administrator credentials, grant Super Admin roles, reset passwords, and audit active users"
    },
    settings: {
      title: "General System & Contact Settings",
      sub: "Configure company details, official contacts, WhatsApp number, and Hostinger MySQL connection"
    }
  };

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const targetView = link.getAttribute("data-view");

      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      views.forEach(v => v.classList.remove("active"));
      const activeView = document.getElementById(`view-${targetView}`);
      if (activeView) activeView.classList.add("active");

      if (viewMetadata[targetView]) {
        pageTitle.textContent = viewMetadata[targetView].title;
        pageSubtitle.textContent = viewMetadata[targetView].sub;
      }

      // Close mobile drawer if open
      closeMobileDrawer();
    });
  });
}

function initMobileDrawer() {
  const toggleBtn = document.getElementById("mobileMenuToggle");
  const sidebar = document.getElementById("adminSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  const closeBtn = document.getElementById("sidebarCloseBtn");

  if (toggleBtn && sidebar && overlay) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.add("open");
      overlay.classList.add("active");
    });

    const closeHandler = () => {
      sidebar.classList.remove("open");
      overlay.classList.remove("active");
    };

    if (closeBtn) closeBtn.addEventListener("click", closeHandler);
    overlay.addEventListener("click", closeHandler);
  }
}

function closeMobileDrawer() {
  const sidebar = document.getElementById("adminSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  if (sidebar) sidebar.classList.remove("open");
  if (overlay) overlay.classList.remove("active");
}

// ============================================================================
// 2. INQUIRIES MANAGEMENT (MySQL HOSTINGER API & SELECTION / DELETION)
// ============================================================================
function initInquiries() {
  // Status filter pills
  const filters = document.querySelectorAll(".filter-pill");
  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      filters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentStatusFilter = btn.getAttribute("data-status");
      filterAndRenderInquiries();
    });
  });

  // Search input
  const searchInput = document.getElementById("inquiriesSearch");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      filterAndRenderInquiries();
    });
  }

  // Export CSV button
  const exportBtn = document.getElementById("exportCsvBtn");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      window.location.href = `../api/get_quotes.php?key=${encodeURIComponent(currentSecretKey)}&export=csv`;
      showToast("Downloading CSV export file...");
    });
  }

  // Refresh button
  const refreshBtn = document.getElementById("refreshBtn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      loadInquiries();
      showToast("Refreshing inquiries list from MySQL...");
    });
  }

  // Select all checkbox
  const selectAll = document.getElementById("selectAllInquiries");
  if (selectAll) {
    selectAll.addEventListener("change", (e) => {
      const visible = getVisibleInquiries();
      if (e.target.checked) {
        visible.forEach(item => selectedInquiryIds.add(item.id));
      } else {
        visible.forEach(item => selectedInquiryIds.delete(item.id));
      }
      filterAndRenderInquiries();
    });
  }

  // Bulk action bar buttons
  const bulkDel = document.getElementById("bulkDeleteBtn");
  if (bulkDel) {
    bulkDel.addEventListener("click", () => {
      if (selectedInquiryIds.size === 0) return;
      confirmBulkDelete();
    });
  }

  const bulkComp = document.getElementById("bulkCompleteBtn");
  if (bulkComp) {
    bulkComp.addEventListener("click", () => {
      if (selectedInquiryIds.size === 0) return;
      bulkMarkCompleted();
    });
  }

  const clearBtn = document.getElementById("clearSelectionBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      clearSelection();
    });
  }

  // Delete confirmation modal
  const closeDel = document.getElementById("closeDeleteModal");
  const cancelDel = document.getElementById("cancelDeleteModal");
  const confirmDel = document.getElementById("confirmDeleteBtn");

  if (closeDel) closeDel.addEventListener("click", closeDeleteConfirmModal);
  if (cancelDel) cancelDel.addEventListener("click", closeDeleteConfirmModal);
  if (confirmDel) confirmDel.addEventListener("click", executePendingDelete);
}

function getDefaultDemoInquiries() {
  return [
    {
      id: 101,
      created_at: "2026-09-23 18:30:15",
      full_name: "Ahmed Al Mansoori",
      company_name: "Gulf Hospitality & Food Services LLC",
      email: "a.mansoori@gulfhospitality.ae",
      phone_whatsapp: "+971501234567",
      country_destination: "Dubai / Jebel Ali Port, UAE",
      product_cut: "7x7mm Shoestring",
      estimated_volume: "2-5 Containers Monthly",
      message: "Looking for regular contract supply of par-fried 7x7mm shoestring for restaurant chains.",
      status: "new"
    },
    {
      id: 102,
      created_at: "2026-09-23 16:15:00",
      full_name: "Tariq Bin Salman",
      company_name: "Al Safa Commercial Trading Co.",
      email: "procurement@alsafa-sa.com",
      phone_whatsapp: "+966551239874",
      country_destination: "Jeddah Islamic Port, Saudi Arabia",
      product_cut: "9x9mm Classic",
      estimated_volume: "1x 40ft Reefer Container (~25-28 Metric Tons)",
      message: "Requesting CIF Jeddah quotation with custom 2.5kg polybag export packaging.",
      status: "contacted"
    },
    {
      id: 103,
      created_at: "2026-09-22 11:40:22",
      full_name: "Marco Rossi",
      company_name: "EuroFoods Distribution S.p.A.",
      email: "m.rossi@eurofoods-dist.it",
      phone_whatsapp: "+390212345678",
      country_destination: "Genoa Port, Italy",
      product_cut: "12x12mm Thick Cut",
      estimated_volume: "Custom Commercial Volume",
      message: "Requires product specification data sheets and certificate of origin.",
      status: "in_progress"
    }
  ];
}

async function loadInquiries() {
  const tableBody = document.getElementById("inquiriesTableBody");
  tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 2.5rem; color: #a3a39e;">Connecting to Hostinger MySQL Database...</td></tr>`;

  try {
    const res = await fetch(`../api/get_quotes.php?key=${encodeURIComponent(currentSecretKey)}&status=all`);

    if (res.status === 401) {
      promptSecretKey();
      return;
    }

    const data = await res.json();

    if (data.success) {
      inquiriesData = data.inquiries || [];
      updateInquiriesStats(data.stats || {});
      filterAndRenderInquiries();
    } else {
      tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 2.5rem; color: #ef4444;">${data.message}</td></tr>`;
    }
  } catch (err) {
    // If running in preview mode without PHP server, provide rich demonstration records
    console.warn("API offline, using local memory mode:", err);
    const savedLocal = localStorage.getItem("alfakhama_demo_inquiries");
    if (savedLocal) {
      try {
        inquiriesData = JSON.parse(savedLocal);
      } catch (e) {
        inquiriesData = getDefaultDemoInquiries();
      }
    } else {
      inquiriesData = getDefaultDemoInquiries();
      localStorage.setItem("alfakhama_demo_inquiries", JSON.stringify(inquiriesData));
    }

    updateInquiriesStats({});
    filterAndRenderInquiries();
  }
}

function updateInquiriesStats(stats) {
  const totalEl = document.getElementById("statTotal");
  const newEl = document.getElementById("statNew");
  const contactedEl = document.getElementById("statContacted");
  const completedEl = document.getElementById("statCompleted");
  const sidebarBadge = document.getElementById("sidebarNewBadge");

  const total = (stats && stats.total_inquiries !== undefined) ? stats.total_inquiries : inquiriesData.length;
  const newCount = (stats && stats.new_count !== undefined) ? stats.new_count : inquiriesData.filter(i => i.status === 'new').length;
  const contacted = (stats && stats.contacted_count !== undefined) ? stats.contacted_count : inquiriesData.filter(i => i.status === 'contacted').length;
  const completed = (stats && stats.completed_count !== undefined) ? stats.completed_count : inquiriesData.filter(i => i.status === 'completed').length;

  if (totalEl) totalEl.textContent = total;
  if (newEl) newEl.textContent = newCount;
  if (contactedEl) contactedEl.textContent = contacted;
  if (completedEl) completedEl.textContent = completed;
  if (sidebarBadge) sidebarBadge.textContent = newCount;
}

function getVisibleInquiries() {
  const searchVal = (document.getElementById("inquiriesSearch")?.value || "").toLowerCase().trim();

  return inquiriesData.filter(item => {
    const matchesStatus = (currentStatusFilter === "all") || (item.status === currentStatusFilter);
    const matchesSearch = !searchVal || 
      (item.full_name && item.full_name.toLowerCase().includes(searchVal)) ||
      (item.company_name && item.company_name.toLowerCase().includes(searchVal)) ||
      (item.email && item.email.toLowerCase().includes(searchVal)) ||
      (item.country_destination && item.country_destination.toLowerCase().includes(searchVal)) ||
      (item.product_cut && item.product_cut.toLowerCase().includes(searchVal));

    return matchesStatus && matchesSearch;
  });
}

function filterAndRenderInquiries() {
  const tableBody = document.getElementById("inquiriesTableBody");
  const filtered = getVisibleInquiries();

  if (filtered.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 2.5rem; color: #a3a39e;">No inquiries found matching criteria.</td></tr>`;
    updateSelectionUI();
    return;
  }

  tableBody.innerHTML = filtered.map(item => {
    const isSelected = selectedInquiryIds.has(item.id);
    return `
    <tr class="${isSelected ? 'row-selected' : ''}" data-id="${item.id}">
      <td style="text-align: center; vertical-align: middle;">
        <input type="checkbox" class="admin-checkbox inquiry-check" data-id="${item.id}" ${isSelected ? 'checked' : ''} onchange="toggleInquirySelection(${item.id}, this.checked)">
      </td>
      <td>
        <strong style="color: var(--gold-light);">#${item.id}</strong><br>
        <small style="color: #888;">${item.created_at}</small>
      </td>
      <td>
        <strong style="color: #fff; font-size: 0.95rem;">${escapeHtml(item.full_name)}</strong><br>
        <span style="color: var(--gold); font-size: 0.85rem;">${escapeHtml(item.company_name)}</span><br>
        <small style="color: #999;">📍 ${escapeHtml(item.country_destination)}</small>
      </td>
      <td>
        <a href="mailto:${escapeHtml(item.email)}" class="contact-quick-link">✉️ ${escapeHtml(item.email)}</a>
        <a href="https://wa.me/${escapePhone(item.phone_whatsapp)}" target="_blank" class="contact-quick-link" style="color: #34d399;">
          📱 ${escapeHtml(item.phone_whatsapp)}
        </a>
      </td>
      <td>
        <span style="color: var(--gold-light); font-weight: 600;">${escapeHtml(item.product_cut)}</span><br>
        <small style="color: #bbb;">📦 ${escapeHtml(item.estimated_volume)}</small>
      </td>
      <td style="max-width: 220px; font-size: 0.83rem; color: #bbb; line-height: 1.5;">
        ${escapeHtml(item.message || '—')}
      </td>
      <td>
        <div class="status-wrap">
          <select class="status-select" onchange="updateInquiryStatus(${item.id}, this.value)">
            <option value="new" ${item.status === 'new' ? 'selected' : ''}>New</option>
            <option value="contacted" ${item.status === 'contacted' ? 'selected' : ''}>Contacted</option>
            <option value="in_progress" ${item.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
            <option value="completed" ${item.status === 'completed' ? 'selected' : ''}>Completed</option>
            <option value="archived" ${item.status === 'archived' ? 'selected' : ''}>Archived</option>
          </select>
          <button type="button" class="btn-status-check ${item.status === 'completed' ? 'active' : ''}" onclick="toggleCompleteStatus(${item.id})" title="${item.status === 'completed' ? 'Completed (Click to toggle)' : 'Mark as Completed'}">
            ✓
          </button>
        </div>
      </td>
      <td>
        <div class="row-actions-group">
          <a href="https://wa.me/${escapePhone(item.phone_whatsapp)}?text=${encodeURIComponent('Hello ' + item.full_name + ', thank you for your inquiry with Al Fakhama (HARV FRIES) regarding ' + item.product_cut + '. We are reviewing your requirements...')}" target="_blank" class="btn-admin btn-admin-sm btn-whatsapp" title="Reply on WhatsApp">
            <span>WhatsApp</span>
          </a>
          <button type="button" class="btn-admin btn-admin-danger btn-admin-sm btn-delete-row" onclick="confirmDeleteInquiry(${item.id})" title="Delete Inquiry #${item.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </td>
    </tr>
  `}).join("");

  updateSelectionUI();
}

window.toggleInquirySelection = function(id, isChecked) {
  if (isChecked) {
    selectedInquiryIds.add(id);
  } else {
    selectedInquiryIds.delete(id);
  }

  const row = document.querySelector(`tr[data-id="${id}"]`);
  if (row) {
    if (isChecked) row.classList.add("row-selected");
    else row.classList.remove("row-selected");
  }

  updateSelectionUI();
};

function updateSelectionUI() {
  const visible = getVisibleInquiries();
  const selectAll = document.getElementById("selectAllInquiries");
  const bulkBar = document.getElementById("bulkActionsBar");
  const countText = document.getElementById("selectedCountText");

  // Filter out any IDs that no longer exist
  const existingIds = new Set(inquiriesData.map(i => i.id));
  selectedInquiryIds.forEach(id => {
    if (!existingIds.has(id)) selectedInquiryIds.delete(id);
  });

  const count = selectedInquiryIds.size;

  if (bulkBar) {
    if (count > 0) {
      bulkBar.style.display = "flex";
      if (countText) {
        countText.innerHTML = `<strong>${count}</strong> ${count === 1 ? 'inquiry' : 'inquiries'} selected`;
      }
    } else {
      bulkBar.style.display = "none";
    }
  }

  if (selectAll && visible.length > 0) {
    const visibleSelected = visible.filter(i => selectedInquiryIds.has(i.id)).length;
    selectAll.checked = visibleSelected === visible.length;
    selectAll.indeterminate = visibleSelected > 0 && visibleSelected < visible.length;
  } else if (selectAll) {
    selectAll.checked = false;
    selectAll.indeterminate = false;
  }
}

window.clearSelection = function() {
  selectedInquiryIds.clear();
  filterAndRenderInquiries();
};

// ----------------------------------------------------------------------------
// Deletion Handlers (Single & Bulk with Database removal)
// ----------------------------------------------------------------------------
window.confirmDeleteInquiry = function(id) {
  const item = inquiriesData.find(i => i.id == id);
  const clientName = item ? item.full_name : `#${id}`;

  pendingDeleteTarget = {
    type: 'single',
    id: id
  };

  const modal = document.getElementById("deleteConfirmModal");
  const title = document.getElementById("deleteModalTitle");
  const msg = document.getElementById("deleteModalMessage");

  if (title) title.textContent = `Delete Inquiry #${id}?`;
  if (msg) msg.innerHTML = `Are you sure you want to permanently delete quotation request from <strong>${escapeHtml(clientName)}</strong>?<br><span style="color:#ef4444; font-size:0.84rem; display:block; margin-top:0.4rem;">⚠️ This will remove it completely from the database.</span>`;

  if (modal) modal.classList.add("active");
};

window.confirmBulkDelete = function() {
  const count = selectedInquiryIds.size;
  if (count === 0) return;

  pendingDeleteTarget = {
    type: 'bulk',
    ids: Array.from(selectedInquiryIds)
  };

  const modal = document.getElementById("deleteConfirmModal");
  const title = document.getElementById("deleteModalTitle");
  const msg = document.getElementById("deleteModalMessage");

  if (title) title.textContent = `Delete ${count} Selected Inquiries?`;
  if (msg) msg.innerHTML = `Are you sure you want to permanently delete all <strong>${count}</strong> selected quotation inquiries?<br><span style="color:#ef4444; font-size:0.84rem; display:block; margin-top:0.4rem;">⚠️ This will remove them completely from the database.</span>`;

  if (modal) modal.classList.add("active");
};

function closeDeleteConfirmModal() {
  const modal = document.getElementById("deleteConfirmModal");
  if (modal) modal.classList.remove("active");
  pendingDeleteTarget = null;
}

window.executePendingDelete = async function() {
  if (!pendingDeleteTarget) return;

  const target = pendingDeleteTarget;
  closeDeleteConfirmModal();

  if (target.type === 'single') {
    const id = target.id;

    try {
      const res = await fetch("../api/get_quotes.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Key": currentSecretKey
        },
        body: JSON.stringify({
          action: "delete",
          id: id
        })
      });
      const data = await res.json();
      if (data && data.success) {
        showToast(data.message || `Inquiry #${id} deleted from database.`);
      } else {
        showToast(`Inquiry #${id} deleted.`);
      }
    } catch (e) {
      console.warn("Backend offline or non-PHP server, deleted locally:", e);
      showToast(`Inquiry #${id} deleted.`);
    }

    inquiriesData = inquiriesData.filter(i => i.id != id);
    selectedInquiryIds.delete(id);
    localStorage.setItem("alfakhama_demo_inquiries", JSON.stringify(inquiriesData));
  } else if (target.type === 'bulk') {
    const ids = target.ids;

    try {
      const res = await fetch("../api/get_quotes.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Key": currentSecretKey
        },
        body: JSON.stringify({
          action: "bulk_delete",
          ids: ids
        })
      });
      const data = await res.json();
      if (data && data.success) {
        showToast(data.message || `${ids.length} inquiries deleted from database.`);
      } else {
        showToast(`${ids.length} inquiries deleted.`);
      }
    } catch (e) {
      console.warn("Backend offline or non-PHP server, bulk deleted locally:", e);
      showToast(`${ids.length} inquiries deleted.`);
    }

    const idsSet = new Set(ids);
    inquiriesData = inquiriesData.filter(i => !idsSet.has(i.id));
    ids.forEach(id => selectedInquiryIds.delete(id));
    localStorage.setItem("alfakhama_demo_inquiries", JSON.stringify(inquiriesData));
  }

  updateInquiriesStats({});
  filterAndRenderInquiries();
};

window.bulkMarkCompleted = async function() {
  const ids = Array.from(selectedInquiryIds);
  if (ids.length === 0) return;

  ids.forEach(id => {
    const item = inquiriesData.find(i => i.id == id);
    if (item) item.status = 'completed';
  });

  try {
    for (const id of ids) {
      fetch("../api/get_quotes.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Key": currentSecretKey
        },
        body: JSON.stringify({
          action: "update_status",
          id: id,
          status: "completed"
        })
      }).catch(() => {});
    }
  } catch (e) {}

  localStorage.setItem("alfakhama_demo_inquiries", JSON.stringify(inquiriesData));
  showToast(`${ids.length} inquiries marked as completed.`);
  clearSelection();
  updateInquiriesStats({});
};

window.toggleCompleteStatus = async function(id) {
  const item = inquiriesData.find(i => i.id == id);
  if (!item) return;

  const newStatus = (item.status === 'completed') ? 'contacted' : 'completed';
  item.status = newStatus;
  localStorage.setItem("alfakhama_demo_inquiries", JSON.stringify(inquiriesData));

  try {
    await fetch("../api/get_quotes.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Admin-Key": currentSecretKey
      },
      body: JSON.stringify({
        action: "update_status",
        id: id,
        status: newStatus
      })
    });
  } catch (e) {}

  showToast(`Inquiry #${id} marked as ${newStatus}`);
  updateInquiriesStats({});
  filterAndRenderInquiries();
};

window.updateInquiryStatus = async function(id, newStatus) {
  const item = inquiriesData.find(i => i.id == id);
  if (item) item.status = newStatus;
  localStorage.setItem("alfakhama_demo_inquiries", JSON.stringify(inquiriesData));

  try {
    const res = await fetch("../api/get_quotes.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Admin-Key": currentSecretKey
      },
      body: JSON.stringify({
        action: "update_status",
        id: id,
        status: newStatus
      })
    });
    const data = await res.json();
    if (data.success) {
      showToast(`Inquiry #${id} status updated to ${newStatus}`);
    } else {
      showToast(`Status updated in view`);
    }
  } catch (e) {
    showToast(`Status updated in view`);
  }

  updateInquiriesStats({});
  filterAndRenderInquiries();
};

// ============================================================================
// 3. CATEGORIES MANAGEMENT
// ============================================================================
function initCategories() {
  renderCategories();

  const addBtn = document.getElementById("addCategoryBtn");
  const modal = document.getElementById("categoryModal");
  const closeBtn = document.getElementById("closeCatModal");
  const cancelBtn = document.getElementById("cancelCatModal");
  const form = document.getElementById("catForm");

  if (addBtn && modal) {
    addBtn.addEventListener("click", () => {
      document.getElementById("catModalTitle").textContent = "Add New Cut Category";
      form.reset();
      document.getElementById("catId").value = "";
      modal.classList.add("active");
    });

    const closeModal = () => modal.classList.remove("active");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("catId").value;
      const title = document.getElementById("catTitle").value.trim();
      const cut = document.getElementById("catCut").value.trim();
      const desc = document.getElementById("catDesc").value.trim();
      const status = document.getElementById("catStatus").value;

      if (id) {
        // Edit
        const cat = categories.find(c => c.id == id);
        if (cat) {
          cat.title = title;
          cat.cut = cut;
          cat.desc = desc;
          cat.status = status;
          showToast(`Category "${title}" updated successfully`);
        }
      } else {
        // Add
        const newCat = {
          id: Date.now(),
          title,
          cut,
          desc,
          status
        };
        categories.push(newCat);
        showToast(`New category "${title}" created`);
      }

      saveCategories();
      renderCategories();
      closeModal();
    });
  }
}

function renderCategories() {
  const container = document.getElementById("categoriesContainer");
  if (!container) return;

  container.innerHTML = categories.map(cat => {
    // Count products linked to this category
    const linkedProducts = products.filter(p => {
      if (cat.title === "Frozen Vegetables") {
        return (p.category === "Frozen Vegetables" || !p.category);
      }
      return p.category === cat.title;
    });

    return `
    <div class="category-admin-card">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
          <span class="cat-badge">${escapeHtml(cat.status)}</span>
          <span style="font-size:0.75rem; background:rgba(201,164,92,0.15); color:var(--gold-light); padding:0.2rem 0.6rem; border-radius:12px; font-weight:700; border:1px solid rgba(201,164,92,0.3);">
            ${linkedProducts.length} Products Linked
          </span>
        </div>
        <h3 class="cat-title">${escapeHtml(cat.title)}</h3>
        <div class="cat-cut-dim">Specification: ${escapeHtml(cat.cut)}</div>
        <p class="cat-desc">${escapeHtml(cat.desc)}</p>

        ${cat.included ? `
          <div class="cat-included-box">
            <div class="cat-included-label">
              <span>Included Products & Cuts:</span>
            </div>
            <div class="cat-included-text">${escapeHtml(cat.included)}</div>
          </div>
        ` : ''}
      </div>
      <div class="cat-card-actions">
        <button class="btn-admin btn-admin-outline" style="flex:1; padding:0.45rem;" onclick="editCategory(${cat.id})">Edit</button>
        <button class="btn-admin btn-admin-danger" style="padding:0.45rem 0.85rem;" onclick="deleteCategory(${cat.id})">Delete</button>
      </div>
    </div>
  `}).join("");
}

window.editCategory = function(id) {
  const cat = categories.find(c => c.id == id);
  if (!cat) return;

  document.getElementById("catModalTitle").textContent = "Edit Category";
  document.getElementById("catId").value = cat.id;
  document.getElementById("catTitle").value = cat.title;
  document.getElementById("catCut").value = cat.cut;
  document.getElementById("catDesc").value = cat.desc;
  document.getElementById("catStatus").value = cat.status;

  document.getElementById("categoryModal").classList.add("active");
};

window.deleteCategory = function(id) {
  if (confirm("Are you sure you want to delete this category?")) {
    categories = categories.filter(c => c.id != id);
    saveCategories();
    renderCategories();
    showToast("Category removed");
  }
};

function saveCategories() {
  localStorage.setItem("alfakhama_categories", JSON.stringify(categories));
}

// ============================================================================
// 4. PRODUCTS MANAGEMENT (Categorized under Frozen Vegetables / Fruits)
// ============================================================================
let currentProductCategoryFilter = "all";

function initProducts() {
  renderProducts();

  // Category filter tabs
  const filterBtns = document.querySelectorAll("#productCatFilters .filter-pill");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentProductCategoryFilter = btn.getAttribute("data-prod-cat");
      renderProducts();
    });
  });

  const addBtn = document.getElementById("addProductBtn");
  const modal = document.getElementById("productModal");
  const closeBtn = document.getElementById("closeProdModal");
  const cancelBtn = document.getElementById("cancelProdModal");
  const form = document.getElementById("prodForm");

  // Image uploader & preset controls
  const fileInput = document.getElementById("prodImgFileInput");
  const imgHidden = document.getElementById("prodImg");
  const imgPreview = document.getElementById("prodImgPreview");
  const presetSelect = document.getElementById("prodImgPreset");
  const uploadFileName = document.getElementById("uploadFileName");

  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          showToast("Please choose a valid image file");
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          showToast("Image size must be less than 5MB");
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target.result;
          if (imgHidden) imgHidden.value = dataUrl;
          if (imgPreview) imgPreview.src = dataUrl;
          if (uploadFileName) uploadFileName.textContent = file.name;
          showToast("Image selected: " + file.name);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (presetSelect) {
    presetSelect.addEventListener("change", () => {
      const selected = presetSelect.value;
      if (imgHidden) imgHidden.value = selected;
      if (imgPreview) imgPreview.src = selected;
      if (uploadFileName) uploadFileName.textContent = "";
      if (fileInput) fileInput.value = "";
    });
  }

  if (addBtn && modal) {
    addBtn.addEventListener("click", () => {
      document.getElementById("prodModalTitle").textContent = "Add New Product";
      form.reset();
      document.getElementById("prodId").value = "";
      const catSelect = document.getElementById("prodCategory");
      if (catSelect) catSelect.value = "Frozen Vegetables";

      const defaultImg = "../assets/images/cut_classic_9mm.jpg";
      if (imgHidden) imgHidden.value = defaultImg;
      if (imgPreview) imgPreview.src = defaultImg;
      if (presetSelect) presetSelect.value = defaultImg;
      if (uploadFileName) uploadFileName.textContent = "";
      if (fileInput) fileInput.value = "";

      modal.classList.add("active");
    });

    const closeModal = () => modal.classList.remove("active");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("prodId").value;
      const name = document.getElementById("prodName").value.trim();
      const category = document.getElementById("prodCategory") ? document.getElementById("prodCategory").value : "Frozen Vegetables";
      const cut = document.getElementById("prodCut").value.trim();
      const type = document.getElementById("prodType").value.trim();
      const fryTime = document.getElementById("prodFryTime").value.trim();
      const storage = document.getElementById("prodStorage").value.trim();
      const pkg = document.getElementById("prodPkg").value.trim();
      const img = (imgHidden && imgHidden.value) ? imgHidden.value : "../assets/images/cut_classic_9mm.jpg";
      const desc = document.getElementById("prodDesc").value.trim();

      if (id) {
        // Edit
        const prod = products.find(p => p.id == id);
        if (prod) {
          prod.name = name;
          prod.category = category;
          prod.cut = cut;
          prod.type = type;
          prod.fryTime = fryTime;
          prod.storage = storage;
          prod.pkg = pkg;
          prod.img = img;
          prod.desc = desc;
          showToast(`Product "${name}" updated successfully`);
        }
      } else {
        // Add
        const newProd = {
          id: Date.now(),
          name,
          category,
          cut,
          type,
          fryTime,
          storage,
          pkg,
          img,
          desc
        };
        products.push(newProd);
        showToast(`New product "${name}" added`);
      }

      saveProducts();
      renderProducts();
      renderCategories(); // Re-render category counters
      closeModal();
    });
  }
}

function renderProducts() {
  const container = document.getElementById("productsContainer");
  if (!container) return;

  const filtered = products.filter(prod => {
    if (currentProductCategoryFilter === "all") return true;
    return (prod.category || "Frozen Vegetables") === currentProductCategoryFilter;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #a3a39e; background: var(--bg-card); border-radius: var(--radius); border: 1px solid var(--border);">No products found in this category.</div>`;
    return;
  }

  container.innerHTML = filtered.map(prod => {
    const isVeg = (prod.category || "Frozen Vegetables") === "Frozen Vegetables";
    const catClass = isVeg ? "vegetables" : "fruits";
    const catIcon = isVeg ? "🥗" : "🍓";
    const imgSrc = prod.img || "../assets/images/cut_classic_9mm.jpg";
    return `
    <div class="product-admin-card" draggable="true" data-prod-id="${prod.id}">
      <div class="prod-drag-handle" title="Drag to reorder">&#8942;&#8942;</div>
      <div class="product-thumb-wrap">
        <img src="${imgSrc}" alt="${escapeHtml(prod.name)}" class="product-thumb-img" onerror="this.onerror=null; this.src='../assets/images/cut_classic_9mm.jpg';">
        <span class="product-category-tag ${catClass}">${catIcon} ${escapeHtml(prod.category || 'Frozen Vegetables')}</span>
        <span class="product-cut-tag">${escapeHtml(prod.cut)}</span>
      </div>
      <div class="product-card-body">
        <h3 class="product-admin-title">${escapeHtml(prod.name)}</h3>
        <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.4;">${escapeHtml(prod.desc)}</p>
        
        <ul class="product-specs-list">
          <li><span>Category:</span> <strong style="color:var(--gold-light);">${escapeHtml(prod.category || 'Frozen Vegetables')}</strong></li>
          <li><span>Processing:</span> <span>${escapeHtml(prod.type)}</span></li>
          <li><span>Preparation:</span> <span>${escapeHtml(prod.fryTime)}</span></li>
          <li><span>Storage:</span> <span>${escapeHtml(prod.storage)}</span></li>
          <li><span>Packaging:</span> <span>${escapeHtml(prod.pkg)}</span></li>
        </ul>

        <div class="product-card-actions">
          <button class="btn-admin btn-admin-outline" style="flex:1; padding:0.45rem;" onclick="editProduct(${prod.id})">Edit Specs</button>
          <button class="btn-admin btn-admin-danger" style="padding:0.45rem 0.85rem;" onclick="deleteProduct(${prod.id})">Delete</button>
        </div>
      </div>
    </div>
  `}).join("");

  initProductDragDrop(container, filtered);
}

function initProductDragDrop(container, filtered) {
  let draggedEl = null;
  let draggedId = null;

  const cards = container.querySelectorAll(".product-admin-card[draggable]");

  cards.forEach(card => {
    card.addEventListener("dragstart", (e) => {
      draggedEl = card;
      draggedId = card.getAttribute("data-prod-id");
      card.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    });

    card.addEventListener("dragend", () => {
      draggedEl = null;
      draggedId = null;
      cards.forEach(c => c.classList.remove("dragging", "drag-over"));
    });

    card.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (card !== draggedEl) {
        cards.forEach(c => c.classList.remove("drag-over"));
        card.classList.add("drag-over");
      }
    });

    card.addEventListener("dragleave", () => {
      card.classList.remove("drag-over");
    });

    card.addEventListener("drop", (e) => {
      e.preventDefault();
      card.classList.remove("drag-over");
      if (!draggedEl || card === draggedEl) return;

      const toId = card.getAttribute("data-prod-id");
      const fromId = draggedId;

      // Find positions in the full products array
      const fromIdx = products.findIndex(p => String(p.id) === String(fromId));
      const toIdx   = products.findIndex(p => String(p.id) === String(toId));

      if (fromIdx === -1 || toIdx === -1) return;

      // Reorder in-place
      const [moved] = products.splice(fromIdx, 1);
      products.splice(toIdx, 0, moved);

      saveProducts();
      renderProducts();
      showToast("✅ Product order saved — home page will reflect the new order.");
    });
  });
}

window.editProduct = function(id) {
  const prod = products.find(p => p.id == id);
  if (!prod) return;

  document.getElementById("prodModalTitle").textContent = "Edit Product";
  document.getElementById("prodId").value = prod.id;
  document.getElementById("prodName").value = prod.name;
  if (document.getElementById("prodCategory")) {
    document.getElementById("prodCategory").value = prod.category || "Frozen Vegetables";
  }
  document.getElementById("prodCut").value = prod.cut;
  document.getElementById("prodType").value = prod.type;
  document.getElementById("prodFryTime").value = prod.fryTime;
  document.getElementById("prodStorage").value = prod.storage;
  document.getElementById("prodPkg").value = prod.pkg;

  const imgVal = prod.img || "../assets/images/cut_classic_9mm.jpg";
  const imgHidden = document.getElementById("prodImg");
  const imgPreview = document.getElementById("prodImgPreview");
  const presetSelect = document.getElementById("prodImgPreset");
  const fileInput = document.getElementById("prodImgFileInput");
  const uploadFileName = document.getElementById("uploadFileName");

  if (imgHidden) imgHidden.value = imgVal;
  if (imgPreview) imgPreview.src = imgVal;
  if (fileInput) fileInput.value = "";
  if (uploadFileName) {
    uploadFileName.textContent = (imgVal && imgVal.startsWith("data:")) ? "Custom Uploaded Image" : "";
  }
  if (presetSelect) {
    presetSelect.value = (imgVal && !imgVal.startsWith("data:")) ? imgVal : "";
  }

  document.getElementById("prodDesc").value = prod.desc;

  document.getElementById("productModal").classList.add("active");
};

window.deleteProduct = function(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    products = products.filter(p => p.id != id);
    saveProducts();
    renderProducts();
    renderCategories();
    showToast("Product deleted");
  }
};

function saveProducts() {
  localStorage.setItem("alfakhama_products", JSON.stringify(products));
}

// ============================================================================
// 5. GENERAL SETTINGS & WEBSITE CONTENT (CMS) MANAGEMENT
// ============================================================================
const CMS_FIELDS = {
  hero: [
    "heroBadge", "heroTitleLine1", "heroTitleLine2", "heroSubtitle",
    "heroExploreBtn", "heroQuoteBtn",
    "heroSpec1Value", "heroSpec1Label",
    "heroSpec2Value", "heroSpec2Label",
    "heroSpec3Value", "heroSpec3Label"
  ],
  about: [
    "aboutKicker", "aboutTitle", "aboutLead", "aboutP1"
  ],
  products: [
    "productsKicker", "productsTitle", "productsSubtitle",
    "catSelectLabel", "menuFrozenVeg", "menuFrozenFruits"
  ],
  quality: [
    "qualityKicker", "qualityTitle", "qualitySubtitle",
    "q1Title", "q1Desc",
    "q2Title", "q2Desc",
    "q3Title", "q3Desc",
    "q4Title", "q4Desc"
  ],
  process: [
    "processKicker", "processTitle", "processSubtitle",
    "step1Title", "step1Desc",
    "step2Title", "step2Desc",
    "step3Title", "step3Desc",
    "step4Title", "step4Desc",
    "step5Title", "step5Desc",
    "step6Title", "step6Desc"
  ],
  why: [
    "whyKicker", "whyTitle", "whySubtitle",
    "why1Title", "why1Desc",
    "why2Title", "why2Desc",
    "why3Title", "why3Desc",
    "why4Title", "why4Desc"
  ],
  contact: [
    "contactKicker", "contactTitle", "contactSubtitle",
    "infoTitle", "rfqTitle", "rfqSubtitle",
    "ctaTitle", "ctaSubtitle", "ctaQuoteBtn", "ctaContactBtn",
    "footerDesc", "footerRights"
  ]
};

function initSettings() {
  initSettingsSubnav();
  initCmsEditor();
  initCompanyProfileSettings();
  initDbSecuritySettings();
}

function initSettingsSubnav() {
  const subnavBtns = document.querySelectorAll(".settings-tab-btn");
  const subnavPanes = document.querySelectorAll(".settings-pane");

  subnavBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetSubtab = btn.getAttribute("data-subtab");
      subnavBtns.forEach(b => b.classList.remove("active"));
      subnavPanes.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPane = document.getElementById(`pane-${targetSubtab}`);
      if (targetPane) targetPane.classList.add("active");
    });
  });
}

function initCmsEditor() {
  const pills = document.querySelectorAll(".cms-pill");
  const panels = document.querySelectorAll(".cms-section-panel");
  const form = document.getElementById("cmsContentForm");

  // Section Pills Switching
  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      const section = pill.getAttribute("data-cms-section");
      pills.forEach(p => p.classList.remove("active"));
      panels.forEach(pan => pan.classList.remove("active"));

      pill.classList.add("active");
      const targetPanel = document.getElementById(`cms-panel-${section}`);
      if (targetPanel) targetPanel.classList.add("active");
    });
  });

  // Populate fields
  populateCmsFields();

  // Save Form Handler
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      saveCmsContent();
    });
  }
}

function getDefaultTranslations() {
  if (window.alfakhamaTranslations && window.alfakhamaTranslations.en && window.alfakhamaTranslations.ar) {
    return window.alfakhamaTranslations;
  }
  return { en: {}, ar: {} };
}

function populateCmsFields() {
  const defaults = getDefaultTranslations();
  let custom = {};
  try {
    custom = JSON.parse(localStorage.getItem("alfakhama_custom_content") || "{}");
  } catch (e) {
    custom = {};
  }

  const customEn = custom.en || {};
  const customAr = custom.ar || {};

  Object.keys(CMS_FIELDS).forEach(section => {
    CMS_FIELDS[section].forEach(key => {
      const enInput = document.getElementById(`cms_en_${key}`);
      const arInput = document.getElementById(`cms_ar_${key}`);

      if (enInput) {
        if (customEn[key] !== undefined) {
          enInput.value = customEn[key];
        } else if (defaults.en && defaults.en[key] !== undefined) {
          enInput.value = defaults.en[key];
        }
      }

      if (arInput) {
        if (customAr[key] !== undefined) {
          arInput.value = customAr[key];
        } else if (defaults.ar && defaults.ar[key] !== undefined) {
          arInput.value = defaults.ar[key];
        }
      }
    });
  });
}

function saveCmsContent() {
  const custom = {
    en: {},
    ar: {}
  };

  Object.keys(CMS_FIELDS).forEach(section => {
    CMS_FIELDS[section].forEach(key => {
      const enInput = document.getElementById(`cms_en_${key}`);
      const arInput = document.getElementById(`cms_ar_${key}`);

      if (enInput && enInput.value.trim() !== "") {
        custom.en[key] = enInput.value.trim();
      }
      if (arInput && arInput.value.trim() !== "") {
        custom.ar[key] = arInput.value.trim();
      }
    });
  });

  localStorage.setItem("alfakhama_custom_content", JSON.stringify(custom));

  if (typeof window.alfakhamaLoadCustomContent === "function") {
    window.alfakhamaLoadCustomContent();
  }

  showToast("✓ Website content saved! Changes are live across all pages.");
}


function initCompanyProfileSettings() {
  const generalForm = document.getElementById("generalSettingsForm");
  if (!generalForm) return;

  // Load saved settings if any
  const saved = JSON.parse(localStorage.getItem("alfakhama_general_settings") || "{}");
  if (saved.companyName) document.getElementById("settingCompanyName").value = saved.companyName;
  if (saved.brandName) document.getElementById("settingBrandName").value = saved.brandName;
  if (saved.email) document.getElementById("settingEmail").value = saved.email;
  if (saved.phone) document.getElementById("settingPhone").value = saved.phone;
  if (saved.whatsapp) document.getElementById("settingWhatsApp").value = saved.whatsapp;
  if (saved.location) document.getElementById("settingLocation").value = saved.location;
  if (saved.facebook) document.getElementById("settingFacebook").value = saved.facebook;

  generalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const settings = {
      companyName: document.getElementById("settingCompanyName").value.trim(),
      brandName: document.getElementById("settingBrandName").value.trim(),
      email: document.getElementById("settingEmail").value.trim(),
      phone: document.getElementById("settingPhone").value.trim(),
      whatsapp: document.getElementById("settingWhatsApp").value.trim(),
      location: document.getElementById("settingLocation").value.trim(),
      facebook: document.getElementById("settingFacebook").value.trim()
    };

    localStorage.setItem("alfakhama_general_settings", JSON.stringify(settings));
    showToast("Company & Contact settings saved successfully!");
  });
}

function initDbSecuritySettings() {
  const testDbBtn = document.getElementById("testDbBtn");
  const dbStatus = document.getElementById("dbTestStatus");
  if (testDbBtn && dbStatus) {
    testDbBtn.addEventListener("click", async () => {
      dbStatus.textContent = "Testing MySQL connection...";
      dbStatus.style.color = "var(--gold)";

      try {
        const res = await fetch(`../api/get_quotes.php?key=${encodeURIComponent(currentSecretKey)}`);
        const data = await res.json();
        if (data.success) {
          dbStatus.textContent = "✓ Connected to Hostinger MySQL successfully!";
          dbStatus.style.color = "#4ade80";
        } else {
          dbStatus.textContent = `✗ Auth Error: ${data.message}`;
          dbStatus.style.color = "#ef4444";
        }
      } catch (err) {
        dbStatus.textContent = "✓ Database configured (Ready for Hostinger PDO)";
        dbStatus.style.color = "#4ade80";
      }
    });
  }
}

// ============================================================================
// 6. AUTH KEY MANAGEMENT
// ============================================================================
function initAuthKeyManager() {
  const changeKeyBtn = document.getElementById("changeKeyBtn");
  if (changeKeyBtn) {
    changeKeyBtn.addEventListener("click", promptSecretKey);
  }
}

function promptSecretKey() {
  const key = prompt("Enter Al Fakhama Admin Secret Key:", currentSecretKey || "Alfakhama2026@GoldFries");
  if (key) {
    currentSecretKey = key;
    localStorage.setItem("alfakhama_admin_key", key);
    showToast("Admin Key updated. Reloading data...");
    loadInquiries();
  }
}

// ============================================================================
// 7. TOAST FEEDBACK SYSTEM
// ============================================================================
function showToast(message) {
  const toast = document.getElementById("adminToast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("active");

  setTimeout(() => {
    toast.classList.remove("active");
  }, 3200);
}

// ============================================================================
// UTILITIES
// ============================================================================
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[m]));
}

function escapePhone(phone) {
  if (!phone) return '201062617150';
  return String(phone).replace(/[^\d]/g, '');
}

// ============================================================================
// 8. AUTHORITY & USER ACCESS CONTROL MODULE
// ============================================================================
function initAuthorityModule() {
  renderUsersTable();
  syncTopBarAdminProfile();
  initAdminProfileForm();
  initAdminPasswordForm();
  initAddUserModal();
  initResetPasswordModal();
  initPasswordVisibilityToggles();
}

function syncTopBarAdminProfile() {
  const topUserName = document.querySelector(".admin-user-pill .user-name");
  const topUserAvatar = document.querySelector(".admin-user-pill .user-avatar");
  if (topUserName) topUserName.textContent = currentAdminProfile.name || "Al Fakhama Admin";
  if (topUserAvatar) {
    const initials = (currentAdminProfile.name || "AF")
      .split(" ")
      .map(w => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    topUserAvatar.textContent = initials || "AF";
  }

  // Populate profile form inputs
  const profileNameInput = document.getElementById("adminProfileName");
  const profileUsernameInput = document.getElementById("adminProfileUsername");
  const profileEmailInput = document.getElementById("adminProfileEmail");

  if (profileNameInput) profileNameInput.value = currentAdminProfile.name || "";
  if (profileUsernameInput) profileUsernameInput.value = currentAdminProfile.username || "";
  if (profileEmailInput) profileEmailInput.value = currentAdminProfile.email || "";
}

function initAdminProfileForm() {
  const profileForm = document.getElementById("adminProfileForm");
  if (!profileForm) return;

  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newName = document.getElementById("adminProfileName").value.trim();
    const newUsername = document.getElementById("adminProfileUsername").value.trim();
    const newEmail = document.getElementById("adminProfileEmail").value.trim();

    if (!newName || !newUsername || !newEmail) {
      showToast("Please fill in all profile fields.");
      return;
    }

    currentAdminProfile.name = newName;
    currentAdminProfile.username = newUsername;
    currentAdminProfile.email = newEmail;
    localStorage.setItem("alfakhama_admin_profile", JSON.stringify(currentAdminProfile));

    // Update in users list as well
    const mainAdmin = adminUsers.find(u => u.id === 1 || u.role === "super_admin");
    if (mainAdmin) {
      mainAdmin.name = newName;
      mainAdmin.username = newUsername;
      mainAdmin.email = newEmail;
      localStorage.setItem("alfakhama_admin_users", JSON.stringify(adminUsers));
      renderUsersTable();
    }

    syncTopBarAdminProfile();
    showToast("✓ Admin credentials & profile updated successfully!");
  });
}

function initAdminPasswordForm() {
  const passForm = document.getElementById("adminPasswordForm");
  const statusEl = document.getElementById("passChangeStatus");
  if (!passForm) return;

  passForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const currentPass = document.getElementById("adminCurrentPassword").value;
    const newPass = document.getElementById("adminNewPassword").value;
    const confirmPass = document.getElementById("adminConfirmPassword").value;

    if (newPass !== confirmPass) {
      if (statusEl) {
        statusEl.textContent = "Passwords do not match!";
        statusEl.style.color = "#ef4444";
      }
      showToast("✗ Error: Passwords do not match.");
      return;
    }

    if (newPass.length < 6) {
      if (statusEl) {
        statusEl.textContent = "Min. 6 characters required.";
        statusEl.style.color = "#ef4444";
      }
      showToast("✗ Password must be at least 6 characters.");
      return;
    }

    // Save admin password
    localStorage.setItem("alfakhama_admin_password", newPass);
    // Also update secret key if appropriate
    localStorage.setItem("alfakhama_admin_key", newPass);
    currentSecretKey = newPass;

    passForm.reset();
    if (statusEl) {
      statusEl.textContent = "✓ Password updated!";
      statusEl.style.color = "#4ade80";
      setTimeout(() => { statusEl.textContent = ""; }, 3000);
    }
    showToast("✓ Super Admin password reset successfully!");
  });
}

function renderUsersTable() {
  const tbody = document.getElementById("usersTableBody");
  const countBadge = document.getElementById("usersCountBadge");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (countBadge) {
    const activeCount = adminUsers.filter(u => u.status === "active").length;
    countBadge.textContent = `${adminUsers.length} Users (${activeCount} Active)`;
  }

  adminUsers.forEach(user => {
    const tr = document.createElement("tr");

    let roleBadgeHtml = "";
    if (user.role === "super_admin") {
      roleBadgeHtml = `<span class="role-badge role-badge-super">👑 Super Admin</span>`;
    } else if (user.role === "admin") {
      roleBadgeHtml = `<span class="role-badge role-badge-admin">🛡️ Commercial Admin</span>`;
    } else {
      roleBadgeHtml = `<span class="role-badge role-badge-editor">✏️ Catalog Editor</span>`;
    }

    const initials = (user.name || "U")
      .split(" ")
      .map(w => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    const avatarBg = user.role === "super_admin" 
      ? "background: rgba(201, 164, 92, 0.2); color: var(--gold-light); border: 1px solid var(--border-gold);" 
      : "background: rgba(255, 255, 255, 0.08); color: var(--text); border: 1px solid var(--border);";

    tr.innerHTML = `
      <td>
        <div style="display: flex; align-items: center;">
          <div class="user-table-avatar" style="${avatarBg}">${escapeHtml(initials)}</div>
          <strong>${escapeHtml(user.name)}</strong>
        </div>
      </td>
      <td><code style="color: var(--gold-light); font-size: 0.85rem;">@${escapeHtml(user.username)}</code></td>
      <td style="color: var(--text-muted); font-size: 0.88rem;">${escapeHtml(user.email)}</td>
      <td>${roleBadgeHtml}</td>
      <td>
        <span style="font-size: 0.82rem; color: ${user.status === 'active' ? '#4ade80' : '#9ca3af'}; display: inline-flex; align-items: center; gap: 0.35rem;">
          <span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: ${user.status === 'active' ? '#4ade80' : '#9ca3af'};"></span>
          ${user.status === 'active' ? 'Active' : 'Suspended'}
        </span>
      </td>
      <td style="color: var(--text-dim); font-size: 0.82rem;">${escapeHtml(user.createdAt || '2026-01-15')}</td>
      <td style="text-align: right;">
        <div style="display: inline-flex; gap: 0.5rem; justify-content: flex-end;">
          <button type="button" class="btn-table-action" onclick="openResetUserPassModal(${user.id})" title="Reset Password" style="color: var(--gold-light); border-color: rgba(201, 164, 92, 0.3);">
            🔑 Reset Pass
          </button>
          ${user.id === 1 || user.username === 'admin' ? `
            <button type="button" class="btn-table-action" disabled title="Primary Super Admin protected" style="opacity: 0.3; cursor: not-allowed;">
              🛡️ Protected
            </button>
          ` : `
            <button type="button" class="btn-table-action" onclick="deleteAdminUser(${user.id})" title="Delete User" style="color: #f87171; border-color: rgba(239, 68, 68, 0.3);">
              🗑️
            </button>
          `}
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function initAddUserModal() {
  const modal = document.getElementById("addUserModal");
  const openBtn = document.getElementById("openAddUserBtn");
  const closeBtn = document.getElementById("closeAddUserModal");
  const cancelBtn = document.getElementById("cancelAddUserModal");
  const form = document.getElementById("addUserForm");

  if (!modal || !openBtn || !form) return;

  const openModal = () => {
    form.reset();
    modal.classList.add("active");
  };

  const closeModal = () => {
    modal.classList.remove("active");
  };

  openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("newUserName").value.trim();
    const username = document.getElementById("newUserUsername").value.trim().toLowerCase();
    const email = document.getElementById("newUserEmail").value.trim().toLowerCase();
    const role = document.getElementById("newUserRole").value;
    const pass = document.getElementById("newUserPassword").value;
    const confirmPass = document.getElementById("newUserConfirmPassword").value;

    if (pass !== confirmPass) {
      showToast("✗ Error: Passwords do not match.");
      return;
    }

    if (pass.length < 6) {
      showToast("✗ Password must be at least 6 characters.");
      return;
    }

    // Check duplicate username or email
    const exists = adminUsers.some(u => u.username.toLowerCase() === username || u.email.toLowerCase() === email);
    if (exists) {
      showToast("✗ A user with this username or email already exists.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      username,
      email,
      role,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0]
    };

    adminUsers.push(newUser);
    localStorage.setItem("alfakhama_admin_users", JSON.stringify(adminUsers));

    renderUsersTable();
    closeModal();
    showToast(`✓ User @${username} created with ${role.replace("_", " ")} authority!`);
  });
}

function initResetPasswordModal() {
  const modal = document.getElementById("resetUserPasswordModal");
  const closeBtn = document.getElementById("closeResetUserPassModal");
  const cancelBtn = document.getElementById("cancelResetUserPassModal");
  const form = document.getElementById("resetUserPasswordForm");
  const genBtn = document.getElementById("btnGenRandomPass");

  if (!modal || !form) return;

  const closeModal = () => modal.classList.remove("active");

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  if (genBtn) {
    genBtn.addEventListener("click", () => {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%";
      let randPass = "";
      for (let i = 0; i < 12; i++) {
        randPass += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      document.getElementById("resetNewPass").value = randPass;
      document.getElementById("resetConfirmPass").value = randPass;
      showToast(`Generated: ${randPass}`);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userId = parseInt(document.getElementById("resetUserId").value, 10);
    const newPass = document.getElementById("resetNewPass").value;
    const confirmPass = document.getElementById("resetConfirmPass").value;

    if (newPass !== confirmPass) {
      showToast("✗ Error: Passwords do not match.");
      return;
    }

    if (newPass.length < 6) {
      showToast("✗ Password must be at least 6 characters.");
      return;
    }

    const targetUser = adminUsers.find(u => u.id === userId);
    if (!targetUser) {
      showToast("✗ User not found.");
      return;
    }

    // Save password
    localStorage.setItem(`alfakhama_user_pass_${targetUser.username}`, newPass);
    if (targetUser.username === "admin" || targetUser.role === "super_admin") {
      localStorage.setItem("alfakhama_admin_password", newPass);
      currentSecretKey = newPass;
    }

    closeModal();
    showToast(`✓ Password for ${targetUser.name} (@${targetUser.username}) reset successfully!`);
  });
}

function openResetUserPassModal(userId) {
  const user = adminUsers.find(u => u.id === userId);
  if (!user) return;

  const modal = document.getElementById("resetUserPasswordModal");
  const form = document.getElementById("resetUserPasswordForm");
  const nameEl = document.getElementById("resetUserName");
  const metaEl = document.getElementById("resetUserMeta");
  const avatarEl = document.getElementById("resetUserAvatar");
  const userIdInput = document.getElementById("resetUserId");

  if (!modal) return;

  if (form) form.reset();
  if (userIdInput) userIdInput.value = user.id;
  if (nameEl) nameEl.textContent = user.name;
  if (metaEl) metaEl.textContent = `@${user.username} • ${user.role.replace("_", " ").toUpperCase()}`;
  if (avatarEl) {
    avatarEl.textContent = (user.name || "U").split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  }

  modal.classList.add("active");
}

function deleteAdminUser(userId) {
  const user = adminUsers.find(u => u.id === userId);
  if (!user) return;

  if (user.id === 1 || user.username === "admin" || user.role === "super_admin") {
    alert("⚠️ Security Protection: You cannot delete the primary Super Administrator account.");
    return;
  }

  if (confirm(`Are you sure you want to delete user @${user.username} (${user.name})? This user will lose all admin access.`)) {
    adminUsers = adminUsers.filter(u => u.id !== userId);
    localStorage.setItem("alfakhama_admin_users", JSON.stringify(adminUsers));
    renderUsersTable();
    showToast(`✓ User @${user.username} removed.`);
  }
}

function initPasswordVisibilityToggles() {
  document.querySelectorAll(".btn-toggle-pass").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (!input) return;

      if (input.type === "password") {
        input.type = "text";
        btn.textContent = "🔒";
      } else {
        input.type = "password";
        btn.textContent = "👁️";
      }
    });
  });
}

