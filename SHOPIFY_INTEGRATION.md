# Shopify Buy Button Integration & Hand-off Guide

This guide outlines how the Shopify Buy Button SDK has been integrated into the Exit Fame artist website, and explains how your development team can configure your live Shopify store credentials to take the shop live.

---

## 🚀 Overview of Integration
The website e-commerce system has been upgraded from a static mockup to use the official **Shopify Buy Button SDK**. 
- **Shopify Buy Button SDK script** is loaded in the `<head>` of `index.html`.
- Custom mock checkout modals, local cart databases, and header badges have been cleaned out.
- Shopify's native **Cart Drawer** and **Bag Toggle widget** are managed dynamically by the SDK.
- The **Product Quick View modal** dynamically initializes and mounts the Shopify Buy Button options selector (sizes/colors), quantity selector, and "Add to Cart" trigger inside the `#shopify-buy-button-container` wrapper.

---

## 🛠️ How to Take the Store Live

All configuration settings are centralized inside the `SHOPIFY_CONFIG` constant at the top of the Merchandise section in **[script.js](file:///c:/Users/Grace/OneDrive/Desktop/exit%20fame%20site/artist-site/script.js)**. 

To connect your active store, edit this block with your credentials:

```javascript
  // 5. --- Shopify Merchandise Configuration & Integration ---
  const SHOPIFY_CONFIG = {
    domain: 'your-store-domain.myshopify.com', // 1. Your Shopify Store Domain
    storefrontAccessToken: 'your_token_here',   // 2. Your Storefront Access Token
    products: {
      'Permanent Stains Hoodie': 'YOUR_PRODUCT_ID',         // 3. Shopify Product ID
      'Recovery Heavyweight Sweatshirt': 'YOUR_PRODUCT_ID', // 3. Shopify Product ID
      'Never Go Back Tee': 'YOUR_PRODUCT_ID',               // 3. Shopify Product ID
      'EF Script Snapback': 'YOUR_PRODUCT_ID',              // 3. Shopify Product ID
      'Ghetto Stains Beanie': 'YOUR_PRODUCT_ID',            // 3. Shopify Product ID
      'EF Team Windbreaker': 'YOUR_PRODUCT_ID'              // 3. Shopify Product ID
    }
  };
```

---

## 📋 Credentials Retrieval Checklist

### 1. Retrieve your Shopify Domain
Your domain is the primary sub-domain format used in your Shopify dashboard URL, ending in `.myshopify.com` (e.g. `exit-fame-merch.myshopify.com`).

### 2. Generate a Storefront API Access Token
The Storefront API Access Token is a public token used to retrieve products, collections, and checkouts from your shop:
1. Log in to your **Shopify Admin Panel**.
2. Go to **Settings** (bottom left) > **Apps and sales channels**.
3. Click **Develop apps**.
4. Click **Create an app** (give it a name like "Exit Fame Website Integration").
5. Under **Configuration**, click **Configure Storefront API scopes**.
6. Check the permissions for **unauthenticated_read_product_listings** (and other read scopes as needed). Click **Save**.
7. Go to the **API credentials** tab, click **Install app**, and copy the **Storefront API access token**.

### 3. Get Product IDs
Shopify assigns a unique 13-digit ID to every product listing. To find the ID for each merch item:
1. In the Shopify Admin Panel, navigate to **Products**.
2. Click on the product you want to connect (e.g., "Permanent Stains Hoodie").
3. Inspect the browser's URL address bar. The URL will look like:
   `https://admin.shopify.com/store/your-store/products/7856487825590`
4. The long number at the very end of the URL (`7856487825590`) is the **Shopify Product ID**. Copy and paste this ID into `script.js` next to its matching item.

---

## 🎨 Styling Customization
The SDK components are styled natively inside their iframe templates via JavaScript properties. The current configuration implements:
- **Button Styling:** Crimson color (`#d32f2f`), Outfit font, and white text, matching the dark aesthetic of the site.
- **Select Fields / Dropdowns:** Minimal dark inputs (`#0d0d0d`) with thin borders (`#222222`).
- **Typography & Labels:** Outfit fonts with uppercase gold typography (`#e5b83b`) for sizes and quantities.

To change button colors, fonts, or checkout actions in the future, your team can adjust the `styles` properties inside `shopifyUi.createComponent` in `script.js`.
