# Monetizační Strategie a Teoretický Model

Tento dokument popisuje komplexní strategii monetizace pro platformu, včetně cenových modelů, funkcí pro platící uživatele a technické implementace.

## 1. Business Model: Freemium

Platforma bude fungovat na modelu Freemium, který umožňuje širokou adopci díky bezplatnému základu, zatímco pokročilé funkce a personalizace jsou zpoplatněny.

### 🥉 Free Tier (Zdarma)
**Cíl:** Akvizice uživatelů, budování komunity, základní vzdělání.
- **Funkce:**
  - Přístup k základním kurzům (limit 3/měsíc).
  - Základní profil a CV.
  - Prohlížení pracovních nabídek.
  - Základní gamifikace (XP, Levely).
  - Reklamy (nepříliš rušivé).
- **Omezení:**
  - Žádné AI funkce (mentor, career path generator).
  - Limitované přihlášky na práce (5/měsíc).
  - Žádné certifikáty.

### 🥈 Pro Tier (Subscription)
**Cena:** ~199 Kč / měsíc (nebo $9.99)
**Cíl:** Pro aktivní studenty a uchazeče o práci, kteří chtějí urychlit kariéru.
- **Funkce:**
  - **Neomezený přístup** ke všem kurzům.
  - **Bez reklam.**
  - **AI Kariérní Mentor (Akize):** Personalizované rady, kontrola CV, příprava na pohovor.
  - **Certifikáty** o dokončení kurzů.
  - **Prioritní zobrazení** profilu zaměstnavatelům.
  - Neomezené přihlášky na práce.
  - Pokročilé statistiky a analytics pokroku.

### 🥇 Enterprise / Business Tier (B2B)
**Cena:** Na míru / Per seat
**Cíl:** Firmy hledající talenty nebo vzdělávající zaměstnance.
- **Funkce:**
  - **Recruitment Dashboard:** Pokročilé filtrování kandidátů.
  - **Employee Training:** Přístup ke kurzům pro zaměstnance.
  - **Custom Learning Paths:** Vytváření vlastních firemních kurzů.
  - **Analytics:** Sledování pokroku zaměstnanců.
  - **Job Posting:** Zvýhodněné inzeráty.

---

## 2. Doplňkové Zdroje Příjmů (Revenue Streams)

### A. Mikrotransakce (In-App Purchases)
- **Gamifikace:**
  - Kosmetické předměty pro avatara / profil.
  - "Freeze" streaku (pokud uživatel vynechá den).
  - Speciální odznaky/rámečky profilu.
- **Jednorázové služby:**
  - Profesionální revize CV expertem (člověkem).
  - Mock interview s expertem.

### B. Reklama (Ad Revenue)
- Cílená reklama pro Free uživatele.
- **Formáty:** Bannerové reklamy, sponzorované kurzy (např. "Microsoft Azure Course" sponzorovaný Microsoftem), sponzorované pracovní nabídky.
- Důraz na relevanci (např. kurz Pythonu -> reklama na Python IDE nebo hosting).

### C. Affiliate Marketing
- Doporučování nástrojů a knih v kurzech.
- Partnerství s hostingy, softwarem, hardwarem.

---

## 3. Technická Implementace

### Platební Brána
- **Stripe:** Primární volba pro globální platby, subscriptions a compliance.
- **Alternativa:** GoPay/ComGate (pro lokální CZ/SK trh).

### Správa Předplatného
- Implementace webhooků pro automatické odemykání/zamykání funkcí.
- Grace period pro neúspěšné platby.
- Upgrade/Downgrade flow.

### Databázové Schema (Návrh)

```prisma
model Subscription {
  id            String    @id @default(cuid())
  userId        String    @unique
  plan          PlanType  @default(FREE) // FREE, PRO, ENTERPRISE
  status        SubStatus @default(ACTIVE)
  startDate     DateTime  @default(now())
  endDate       DateTime?
  stripeCustId  String?
  stripeSubId   String?
}

enum PlanType {
  FREE
  PRO
  ENTERPRISE
}
```

---

## 4. Marketingová Strategie Monetizace

- **Free Trial:** 7 dní Pro zdarma pro nové uživatele.
- **Referral Program:** "Pozvi kamaráda, získej měsíc Pro zdarma".
- **Gamified Unlocks:** Některé Pro funkce lze jednorázově odemknout za vysoký počet XP (motivace k aktivitě).
- **Sezónní slevy:** Black Friday, Back to School.

---

## 5. Právní Aspekty

- Obchodní podmínky (Terms of Service).
- Zásady ochrany osobních údajů (GDPR).
- Reklamační řád.
