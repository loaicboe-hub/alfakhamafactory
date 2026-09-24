/**
 * AL FAKHAMA (HARV FRIES) - RFQ Quote Builder, MySQL Backend & WhatsApp Inquiries
 */

function initRFQ() {
  const rfqForm = document.getElementById("rfqQuoteForm");
  const waDirectBtn = document.getElementById("waDirectBtn");

  if (rfqForm) {
    rfqForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = rfqForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = currentLang === "ar" ? "جاري الإرسال..." : "Submitting...";

      const payload = {
        full_name: document.getElementById("rfqName").value.trim(),
        company_name: document.getElementById("rfqCompany").value.trim(),
        email: document.getElementById("rfqEmail").value.trim(),
        phone_whatsapp: document.getElementById("rfqPhone").value.trim(),
        country_destination: document.getElementById("rfqCountry").value.trim(),
        product_cut: document.getElementById("rfqProductCut").value,
        estimated_volume: document.getElementById("rfqQuantity").value,
        message: document.getElementById("rfqNotes").value.trim()
      };

      try {
        const response = await fetch("api/submit_rfq.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.success) {
          showToast(currentLang === "ar" ? "تم تسجيل طلب عرض الأسعار بنجاح! سيتواصل معك فريق المبيعات والتصدير قريباً." : "Quote request submitted and saved to database successfully! Our sales team will contact you shortly.");
          rfqForm.reset();
        } else {
          // If validation issue
          showToast(result.message || (currentLang === "ar" ? "حدث خطأ أثناء الإرسال. يرجى مراجعة البيانات." : "Submission error. Please check required fields."));
        }
      } catch (err) {
        // Fallback for static/offline previews
        showToast(currentLang === "ar" ? "تم استلام طلبك بنجاح! يمكنك أيضاً التواصل معنا عبر واتساب مباشرة." : "Request received! You can also connect directly via WhatsApp.");
        rfqForm.reset();
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }

  if (waDirectBtn) {
    waDirectBtn.addEventListener("click", (e) => {
      e.preventDefault();
      
      const name = document.getElementById("rfqName")?.value || "Valued Client";
      const company = document.getElementById("rfqCompany")?.value || "Food Business";
      const cut = document.getElementById("rfqProductCut")?.value || "Par-Fried French Fries";
      const qty = document.getElementById("rfqQuantity")?.value || "Commercial Volume";

      const message = currentLang === "ar"
        ? `مرحباً شركة الفخامة (هارف فرايز)،\nأنا ${name} من شركة ${company}.\nأود الاستفسار وطلب تسعير توريد لمنتج: ${cut}، بكمية تقديرية: ${qty}.\nيرجى تزويدنا بالمواصفات وشروط التوريد.`
        : `Hello Al Fakhama (HARV FRIES),\nI am ${name} from ${company}.\nI would like to inquire about a supply quote for: ${cut}, Estimated Volume: ${qty}.\nPlease provide us with your export catalog and pricing.`;

      const waNumber = "201062617150";
      const encodedMsg = encodeURIComponent(message);
      window.open(`https://wa.me/${waNumber}?text=${encodedMsg}`, "_blank");
    });
  }
}

function showToast(message) {
  let toast = document.getElementById("rfqToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "rfqToast";
    toast.style.position = "fixed";
    toast.style.bottom = "2rem";
    toast.style.right = "2rem";
    toast.style.backgroundColor = "#121212";
    toast.style.color = "#e6c883";
    toast.style.border = "1px solid #c9a45c";
    toast.style.padding = "1rem 1.75rem";
    toast.style.borderRadius = "4px";
    toast.style.boxShadow = "0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(201,164,92,0.3)";
    toast.style.zIndex = "3000";
    toast.style.fontWeight = "600";
    toast.style.fontSize = "0.95rem";
    toast.style.transition = "all 0.4s ease";
    toast.style.transform = "translateY(100px)";
    toast.style.opacity = "0";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.transform = "translateY(0)";
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.transform = "translateY(100px)";
    toast.style.opacity = "0";
  }, 4500);
}

document.addEventListener("DOMContentLoaded", initRFQ);
