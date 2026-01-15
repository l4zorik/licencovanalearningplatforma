# Reklamní Systém - Implementace a Strategie

## 📊 Přehled Reklamního Systému

Platforma má připravený hybridní monetizační model kombinující freemium subscription s reklamami pro maximalizaci příjmů.

## 🎯 Strategie Umístění Reklam

### 1. **Header Banner** (`position="top"`)
- **Umístění**: Nahoře na hlavní stránce
- **Velikost**: Large (120px height)
- **Strategie**: Viditelný ale ne rušivý
- **RPM potenciál**: Vysoký (high visibility)

### 2. **Sidebar Banner** (`position="sidebar"`)
- **Umístění**: Vedle job board sekce
- **Velikost**: Medium (90px height)
- **Strategie**: Kontextuální reklamy kurzů, nástrojů
- **RPM potenciál**: Střední

### 3. **Content Banner** (`position="content"`)
- **Umístění**: Mezi sekcemi v career report
- **Velikost**: Large (120px height)
- **Strategie**: Relevantní obsahové reklamy
- **RPM potenciál**: Vysoký (content targeting)

## 💰 Příjmový Model

### **Reklamní Příjmy**
- **Google AdSense**: $1-5 za 1000 zobrazení (CPM)
- **Affiliate reklamy**: 5-20% provize z prodejů
- **Direct reklamy**: Vlastní prodej reklamních ploch

### **Odhadované Příjmy**
- **1000 denních uživatelů**: $50-200/den z reklam
- **10,000 uživatelů**: $500-2000/den z reklam
- **Subscription mix**: 20% premium uživatelé = další $200-800/den

## 🛠️ Technická Implementace

### **Ad Component Structure**
```typescript
const AdBanner = ({ position, size = "medium" }: {
  position: string,
  size?: string
}) => {
  const isPremium = false; // User subscription check

  if (isPremium) return null; // Hide ads for premium

  return (
    <div className={`ad-banner ad-${position} ${size}`}>
      {/* Ad network code here */}
    </div>
  );
};
```

### **Premium Feature Gating**
```typescript
// In components that show ads
{!userIsPremium && <AdBanner position="sidebar" />}
```

### **Ad Network Integration**

#### **Google AdSense**
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
     data-ad-slot="xxxxxxxxxx"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

#### **Media.net**
```html
<script id="mNCC" language="javascript">
  medianet_width = "728";
  medianet_height = "90";
  medianet_crid = "xxxxxxxx";
</script>
<script src="//contextual.media.net/nmedianet.js"></script>
```

## 🎯 Reklamní Strategie

### **Target Audience**
- **Students**: Vzdělávací kurzy, online školy
- **Developers**: Development tools, hosting, API
- **Job Seekers**: Kariérní kurzy, resume services
- **IT Professionals**: Certification, conferences

### **Affiliate Opportunities**
- **Coursera/Udemy**: Online kurzy (5-15% commission)
- **GitHub**: Developer tools
- **AWS/Azure**: Cloud services
- **Figma/Adobe**: Design tools
- **LinkedIn**: Professional networking

### **Native Advertising**
- **Sponsored Articles**: "Jak se stát AI engineerem" sponzorované kurzem
- **Product Reviews**: Recenze nástrojů s affiliate links
- **Job Listings**: Premium job listings
- **Company Spotlights**: Firemní profily

## 📈 Optimalizace a Měření

### **Key Metrics**
- **RPM (Revenue Per Mille)**: Příjem za 1000 zobrazení
- **CTR (Click-Through Rate)**: Procentuální klikání
- **Fill Rate**: Procento zaplněných reklamních ploch
- **eCPM**: Efektivní cost per mille

### **A/B Testing**
- **Ad placements**: Testování různých pozic
- **Ad formats**: Banner vs native vs video
- **Ad frequency**: Jak často zobrazovat reklamy

### **User Experience**
- **Non-intrusive**: Reklamy nesmí rušit UX
- **Relevant content**: Kontextuální reklamy
- **Premium escape**: Jasná cesta k ads-free zážitku

## 🚀 Implementace Roadmap

### **Phase 1: Basic Setup**
- [ ] Google AdSense účet
- [ ] Ad komponenty implementace
- [ ] Basic placements (header, sidebar)

### **Phase 2: Optimization**
- [ ] A/B testing reklamních formátů
- [ ] Affiliate program setup
- [ ] Analytics a tracking

### **Phase 3: Advanced Features**
- [ ] Native advertising systém
- [ ] Dynamic ad targeting
- [ ] Personalized ad recommendations

## ⚖️ Právní Aspekty

### **Compliance**
- **GDPR**: Souhlas s cookies a tracking
- **CCPA**: Kalifornské privacy laws
- **COPPA**: Ochrana dětí online

### **Ad Policies**
- **Google AdSense**: Content guidelines
- **Affiliate disclosure**: Transparentnost provizí
- **FTC guidelines**: Endorsement rules

## 💡 Doporučení

### **Začínáme s Reklamami**
1. **Začněte s Google AdSense** - Nejjednodušší začátek
2. **Implementujte premium tier** - Ads-free pro platící uživatele
3. **Měřte a optimalizujte** - Sledujte metrics a upravujte
4. **Přidejte affiliate program** - Pasivní příjem z doporučení

### **Úspěšné Příklady**
- **GitHub**: Freemium s GitHub Sponsors
- **Medium**: Subscription + reklamy
- **Stack Overflow**: Reklamy + jobs
- **Codecademy**: Subscription model

## 📞 Kontakt pro Reklamy

Pro reklamní partnery a spolupráci kontaktujte:
- Email: ads@platforma.cz
- Form: `/advertise-with-us`

---

*Tento reklamní systém je navržen pro maximalizaci příjmů při zachování skvělé user experience.*