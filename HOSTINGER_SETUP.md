# Hostinger MySQL Database Setup & Deployment Guide
## دليل إعداد قاعدة بيانات MySQL والرفع على استضافة هوستنجر (Hostinger)

---

## 🇬🇧 English Guide

### Step 1: Create a MySQL Database on Hostinger
1. Log in to your **Hostinger hPanel** ([hpanel.hostinger.com](https://hpanel.hostinger.com)).
2. Go to **Websites** → Select your domain → Click **Manage**.
3. In the left sidebar or search bar, navigate to **Databases** → **Management**.
4. Under **Create a New MySQL Database and Database User**:
   - **MySQL Database name:** e.g., `alfakhama` (Full name will look like `u123456789_alfakhama`)
   - **MySQL Username:** e.g., `dbadmin` (Full user will look like `u123456789_dbadmin`)
   - **Password:** Enter a strong password.
5. Click **Create**. Note down the full Database Name, Username, and Password.

---

### Step 2: Import the Database Schema
1. In the same Databases section in Hostinger, find your new database and click **Enter phpMyAdmin**.
2. Click on your database name in the left menu.
3. Click on the **Import** tab at the top.
4. Click **Choose File** and select [`database/schema.sql`](file:///d:/PROJECTS/alfakhama/database/schema.sql).
5. Click **Go** / **Import** at the bottom.
6. The `rfq_inquiries` table will be created instantly.

---

### Step 3: Configure Database Credentials in the Code
Open the file [`api/config.php`](file:///d:/PROJECTS/alfakhama/api/config.php) and update these lines:

```php
define('DB_HOST', 'localhost');                   // Keep as localhost on Hostinger
define('DB_NAME', 'u123456789_alfakhama');         // Put your Hostinger DB Name
define('DB_USER', 'u123456789_dbadmin');           // Put your Hostinger DB Username
define('DB_PASS', 'YOUR_STRONG_PASSWORD_HERE');    // Put your Hostinger DB Password

// Admin Dashboard Secret Key
define('ADMIN_SECRET_KEY', 'Alfakhama2026@GoldFries'); // Change to your preferred key

// Email to receive quote notifications
define('NOTIFICATION_EMAIL', 'info@alfakhama-fries.com');
```

---

### Step 4: Upload Website Files to Hostinger
1. In Hostinger hPanel, go to **Files** → **File Manager** (or use FileZilla FTP).
2. Open the `public_html/` directory.
3. Upload all files from this project folder into `public_html/`:
   - `index.html`
   - `css/`
   - `js/`
   - `assets/`
   - `api/`
   - `admin/`
4. That's it! Your website is live and connected to MySQL.

---

### Step 5: Access the Admin Inquiries Dashboard
- Navigate in your browser to: `https://yourdomain.com/admin/`
- Enter your Admin Secret Key (`Alfakhama2026@GoldFries`).
- You can now view all incoming quote requests, update lead statuses, contact clients directly on WhatsApp, and export everything to **Excel (CSV)** with one click.

---
---

## 🇪🇬 الدليل باللغة العربية (خطوات التشغيل على هوستنجر)

### الخطوة 1: إنشاء قاعدة بيانات MySQL على هوستنجر
1. قم بتسجيل الدخول إلى لوحة تحكم هوستنجر **Hostinger hPanel**.
2. اختر موقعك واضغط على **Manage (إدارة)**.
3. من القائمة الجانبية اذهب إلى **Databases (قواعد البيانات)** ← **Management (الإدارة)**.
4. تحت قسم **Create a New MySQL Database and Database User**:
   - **اسم قاعدة البيانات (Database Name):** اكتب مثلاً `alfakhama` (الاسم النهائي سيكون بالشكل `u123456789_alfakhama`).
   - **اسم المستخدم (Username):** اكتب مثلاً `admin` (الاسم النهائي سيكون بالشكل `u123456789_admin`).
   - **كلمة المرور (Password):** اكتب كلمة مرور قوية واحفظها.
5. اضغط على زر **Create (إنشاء)**.

---

### الخطوة 2: استيراد جدول البيانات (schema.sql)
1. بجوار قاعدة البيانات التي تم إنشاؤها اضغط على **Enter phpMyAdmin**.
2. اضغط على اسم قاعدة البيانات من القائمة اليسرى.
3. اضغط على تبويب **Import (استيراد)** من الأعلى.
4. اضغط على **Choose File (اختيار ملف)** واختر الملف [`database/schema.sql`](file:///d:/PROJECTS/alfakhama/database/schema.sql).
5. اضغط على زر **Import / Go (تنفيذ)** في الأسفل.
6. سيتم إنشاء جدول `rfq_inquiries` بنجاح.

---

### الخطوة 3: تعديل بيانات الاتصال في الكود
افتح الملف [`api/config.php`](file:///d:/PROJECTS/alfakhama/api/config.php) وقم بتعديل الآتي:

```php
define('DB_HOST', 'localhost');                   // اتركها localhost كما هي
define('DB_NAME', 'u123456789_alfakhama');         // ضع اسم قاعدة البيانات الكامل من هوستنجر
define('DB_USER', 'u123456789_admin');             // ضع اسم المستخدم الكامل من هوستنجر
define('DB_PASS', 'YOUR_STRONG_PASSWORD_HERE');    // ضع كلمة المرور التي اخترتها

// الرقم السري للدخول للوحة تحكم الطلبات
define('ADMIN_SECRET_KEY', 'Alfakhama2026@GoldFries');

// بريدك الإلكتروني لاستقبال إشعارات الطلبات
define('NOTIFICATION_EMAIL', 'info@alfakhama-fries.com');
```

---

### الخطوة 4: رفع الملفات على الاستضافة
1. من لوحة هوستنجر، افتح **File Manager (مدير الملفات)**.
2. ادخل إلى مجلد `public_html/`.
3. ارفع جميع ملفات ومجلدات المشروع:
   - `index.html`
   - `css/`
   - `js/`
   - `assets/`
   - `api/`
   - `admin/`

---

### الخطوة 5: الدخول إلى لوحة إدارة الطلبات والتسعيرات
- افتح الرابط التالي في المتصفح: `https://yourdomain.com/admin/`
- أدخل المفتاح السري الخاص بك (`Alfakhama2026@GoldFries`).
- ستتمكن من استعراض كافة طلبات عروض الأسعار المسجلة في MySQL، والتواصل المباشر مع العملاء عبر واتساب، وتصدير كامل البيانات إلى ملف **Excel (CSV)** بضغطة زر.
