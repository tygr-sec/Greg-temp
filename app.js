const STORAGE_KEYS = {
  users: "mds_users",
  documents: "mds_documents",
  bills: "mds_bills",
  session: "mds_session",
  archives: "mds_archives",
  polls: "mds_polls",
  cases: "mds_cases",
  googleDocs: "mds_google_docs"
};

const billStages = [
  { id: "submitted", label: "Submitted" },
  { id: "debate", label: "Debate" },
  { id: "committee", label: "Committee" },
  { id: "vote", label: "Vote" },
  { id: "passed", label: "Passed" }
];

const appState = {
  view: "login",
  user: null,
  selectedCategory: "all",
  selectedBillId: null,
  selectedCaseId: null,
  selectedUserEmail: null
};

const templates = new Map();

function initTemplates() {
  document.querySelectorAll("template").forEach((template) => {
    templates.set(template.id, template);
  });
}

function initSeedData() {
  const defaultUsers = [
    {
      name: "Jamie Rivera",
      email: "jamie.rivera@newphiladelphia.gov",
      password: "rivera!2024",
      role: "ccomm"
    },
    {
      name: "Alex Morgan",
      email: "alex.morgan@newphiladelphia.gov",
      password: "password123",
      role: "staff"
    },
    {
      name: "Councilmember Priya Shah",
      email: "priya.shah@newphiladelphia.gov",
      password: "council2024",
      role: "legislator"
    }
  ];

  const defaultDocuments = [
    {
      id: "app-001",
      title: "Business License Application",
      category: "Applications",
      summary: "Standard application for prospective businesses seeking approval to operate within city limits.",
      owner: "Department of Commerce",
      updatedAt: "2024-10-01",
      s3Key: "s3://mds-city-storage/applications/business-license-application.pdf"
    },
    {
      id: "form-014",
      title: "Employee Reimbursement Form",
      category: "Forms",
      summary: "Expense reimbursement claim template for municipal employees.",
      owner: "Finance Department",
      updatedAt: "2024-09-22",
      s3Key: "s3://mds-city-storage/forms/employee-reimbursement.xlsx"
    },
    {
      id: "jud-204",
      title: "Municipal Court Arraignment Checklist",
      category: "Judicial Paperwork",
      summary: "Checklist for intake clerks to confirm arraignment filings are complete.",
      owner: "Municipal Court",
      updatedAt: "2024-08-18",
      s3Key: "s3://mds-city-storage/judicial/arraignment-checklist.docx"
    },
    {
      id: "leg-311",
      title: "Noise Ordinance Amendment",
      category: "Legislation",
      summary: "Revision to permissible construction hours for downtown district developments.",
      owner: "City Council",
      updatedAt: "2024-07-29",
      s3Key: "s3://mds-city-storage/legislation/noise-ordinance-amendment.pdf"
    },
    {
      id: "app-032",
      title: "Community Event Permit",
      category: "Applications",
      summary: "Application for hosting community gatherings, street fairs, or parades.",
      owner: "Neighborhood Services",
      updatedAt: "2024-05-14",
      s3Key: "s3://mds-city-storage/applications/community-event-permit.pdf"
    },
    {
      id: "form-101",
      title: "Capital Project Intake Form",
      category: "Forms",
      summary: "Submission for capital projects requiring multi-department coordination.",
      owner: "Planning & Development",
      updatedAt: "2024-04-30",
      s3Key: "s3://mds-city-storage/forms/capital-project-intake.docx"
    }
  ];

  const defaultBills = [
    {
      id: "B-24-017",
      title: "Green Corridors Infrastructure Plan",
      sponsor: "Councilmember Priya Shah",
      summary: "Allocates funds to expand green stormwater infrastructure along Market Street.",
      status: "committee",
      history: [
        { stage: "submitted", date: "2024-04-03" },
        { stage: "debate", date: "2024-04-18" },
        { stage: "committee", date: "2024-05-02" }
      ],
      fileName: "green-corridors-infrastructure-plan.pdf",
      repealed: false
    },
    {
      id: "B-24-021",
      title: "Downtown Pedestrian Safety Act",
      sponsor: "Councilmember Mateo Alvarez",
      summary: "Introduces new crosswalk beacons and traffic calming measures near schools.",
      status: "vote",
      history: [
        { stage: "submitted", date: "2024-05-12" },
        { stage: "debate", date: "2024-05-26" },
        { stage: "committee", date: "2024-06-10" },
        { stage: "vote", date: "2024-06-24" }
      ],
      fileName: "downtown-pedestrian-safety-act.pdf",
      repealed: false
    },
    {
      id: "B-23-099",
      title: "Urban Agriculture Incentive Program",
      sponsor: "Council President Maya Chen",
      summary: "Provides grants for rooftop farms and community gardens to expand local food access.",
      status: "passed",
      history: [
        { stage: "submitted", date: "2023-02-15" },
        { stage: "debate", date: "2023-03-01" },
        { stage: "committee", date: "2023-03-14" },
        { stage: "vote", date: "2023-03-28" },
        { stage: "passed", date: "2023-04-01" }
      ],
      fileName: "urban-agriculture-incentive-program.pdf",
      repealed: false
    }
  ];

  const defaultArchives = [
    {
      id: "archive-001",
      title: "Centennial Parade Footage",
      description: "Full recording of the city centennial parade and mayoral remarks.",
      type: "Video",
      year: 2019,
      url: "https://example.com/archives/centennial-parade.mp4"
    },
    {
      id: "archive-002",
      title: "Historic Zoning Maps",
      description: "Digitized zoning overlays from 1950-1975.",
      type: "Document",
      year: 1975,
      url: "https://example.com/archives/historic-zoning-maps.pdf"
    },
    {
      id: "archive-003",
      title: "Mayoral Press Briefings",
      description: "Archive of monthly mayoral press briefing transcripts.",
      type: "Transcript",
      year: 2022,
      url: "https://example.com/archives/mayoral-briefings.zip"
    }
  ];

  const defaultPolls = [
    {
      id: "poll-001",
      question: "Should the city extend weekend transit hours?",
      opened: "2024-03-14",
      closed: "2024-03-21",
      result: "Passed (68% in favor)",
      participants: 12453
    },
    {
      id: "poll-002",
      question: "Preferred location for the new community recreation center?",
      opened: "2024-01-05",
      closed: "2024-01-19",
      result: "East Riverfront selected",
      participants: 8621
    }
  ];

  const defaultCases = [
    {
      id: "case-001",
      title: "City of New Philadelphia v. Blue Horizon Developments",
      docket: "2023-MUN-147",
      judges: ["Hon. Evelyn Porter", "Hon. Malik Rowan"],
      summary: "Dispute over compliance with affordable housing set-asides in a mixed-use development.",
      holding: "Court ordered developer to reserve 15% of units for affordable housing and pay compliance penalties.",
      date: "2023-11-19"
    },
    {
      id: "case-002",
      title: "Citizens for Clean Water v. Department of Utilities",
      docket: "2024-MUN-034",
      judges: ["Hon. Xavier Patel"],
      summary: "Challenge to maintenance schedules for the municipal water treatment facility.",
      holding: "Mandamus granted requiring accelerated maintenance and quarterly transparency reports.",
      date: "2024-02-07"
    },
    {
      id: "case-003",
      title: "New Philadelphia Housing Authority v. Malik Johnson",
      docket: "2024-MUN-076",
      judges: ["Hon. Teresa Ocampo"],
      summary: "Eviction proceeding focused on procedural due process in emergency shelter transitions.",
      holding: "Case dismissed; authority directed to revise emergency relocation policies.",
      date: "2024-06-18"
    }
  ];

  const defaultGoogleDocs = [
    {
      id: "doc-charter",
      title: "New Philadelphia Municipal Charter (Live)",
      description: "Source of truth for the charter maintained collaboratively in Google Docs.",
      url: "https://docs.google.com/document/d/1xJ8bCj2C1u04-example/preview"
    },
    {
      id: "doc-registry",
      title: "Citizen Identification Registry",
      description: "Live registry updated by City Clerk staff for citizen credential verification.",
      url: "https://docs.google.com/spreadsheets/d/12js8ExampleCitizenRegistry/preview"
    }
  ];

  if (!localStorage.getItem(STORAGE_KEYS.users)) {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(defaultUsers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.documents)) {
    localStorage.setItem(STORAGE_KEYS.documents, JSON.stringify(defaultDocuments));
  }
  if (!localStorage.getItem(STORAGE_KEYS.bills)) {
    localStorage.setItem(STORAGE_KEYS.bills, JSON.stringify(defaultBills));
  }
  if (!localStorage.getItem(STORAGE_KEYS.archives)) {
    localStorage.setItem(STORAGE_KEYS.archives, JSON.stringify(defaultArchives));
  }
  if (!localStorage.getItem(STORAGE_KEYS.polls)) {
    localStorage.setItem(STORAGE_KEYS.polls, JSON.stringify(defaultPolls));
  }
  if (!localStorage.getItem(STORAGE_KEYS.cases)) {
    localStorage.setItem(STORAGE_KEYS.cases, JSON.stringify(defaultCases));
  }
  if (!localStorage.getItem(STORAGE_KEYS.googleDocs)) {
    localStorage.setItem(STORAGE_KEYS.googleDocs, JSON.stringify(defaultGoogleDocs));
  }
}

function getData(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function setSession(user) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.session);
  }
}

function getSession() {
  const raw = localStorage.getItem(STORAGE_KEYS.session);
  return raw ? JSON.parse(raw) : null;
}

function render(templateId) {
  const template = templates.get(templateId);
  if (!template) return;
  const fragment = template.content.cloneNode(true);
  const container = document.getElementById("mainContent");
  container.innerHTML = "";
  container.appendChild(fragment);
  container.focus();
}

function setTopNav() {
  const nav = document.getElementById("topNav");
  const sessionInfo = document.getElementById("sessionInfo");
  nav.innerHTML = "";

  if (!appState.user) {
    sessionInfo.textContent = "Public access";
    return;
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "documents", label: "Documents" },
    { id: "bills", label: "Bill Tracker" },
    { id: "jurisprudence", label: "Jurisprudence" },
    { id: "archives", label: "Archives" },
    { id: "polls", label: "Voting Polls" },
    { id: "public", label: "Public Portal" }
  ];

  if (appState.user.role === "ccomm") {
    navItems.splice(4, 0, { id: "admin", label: "Admin" });
  }

  navItems.forEach((item) => {
    const button = document.createElement("button");
    button.textContent = item.label;
    button.dataset.nav = item.id;
    if (appState.view === item.id) {
      button.classList.add("active");
    }
    nav.appendChild(button);
  });

  const logoutButton = document.createElement("button");
  logoutButton.classList.add("btn", "secondary");
  logoutButton.textContent = "Sign out";
  logoutButton.dataset.nav = "logout";
  nav.appendChild(logoutButton);

  sessionInfo.textContent = `${appState.user.name} (${roleLabel(appState.user.role)})`;
}

function roleLabel(role) {
  switch (role) {
    case "ccomm":
      return "CComm Admin";
    case "legislator":
      return "Legislator";
    default:
      return "Staff";
  }
}

function handleNavigation(event) {
  const navTarget = event.target.closest("[data-nav]");
  if (!navTarget) return;
  const view = navTarget.dataset.nav;

  if (view === "logout") {
    appState.user = null;
    appState.view = "login";
    setSession(null);
    renderLogin();
    setTopNav();
    return;
  }

  if (view === "login") {
    appState.user = null;
    appState.view = "login";
    renderLogin();
    setTopNav();
    return;
  }

  appState.view = view;
  renderView(view);
  highlightNav(view);
}

function highlightNav(view) {
  document
    .querySelectorAll(".top-nav button")
    .forEach((button) => button.classList.toggle("active", button.dataset.nav === view));
}

function renderView(view) {
  switch (view) {
    case "dashboard":
      renderDashboard();
      break;
    case "documents":
      renderDocuments();
      break;
    case "bills":
      renderBills();
      break;
    case "archives":
      renderArchives();
      break;
    case "public":
      renderPublic();
      break;
    case "jurisprudence":
      renderJurisprudence();
      break;
    case "admin":
      renderAdmin();
      break;
    case "polls":
      renderPolls();
      break;
    default:
      renderLogin();
  }
}

function renderLogin() {
  render("loginTemplate");
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", handleLogin);
  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", handleNavigation);
  });
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value.trim();
  const users = getData(STORAGE_KEYS.users);
  const user = users.find((u) => u.email.toLowerCase() === email && u.password === password);

  if (!user) {
    alert("Invalid credentials. Please check your email and password.");
    return;
  }

  appState.user = user;
  setSession(user);
  appState.view = "dashboard";
  setTopNav();
  renderDashboard();
}

function renderDashboard() {
  guardAuth();
  render("dashboardTemplate");
  populateDocumentDashboard();
  populateBillSummary();
  populateArchivesOverview();
  attachNavHandlers();
}

function guardAuth() {
  if (!appState.user) {
    renderLogin();
    throw new Error("Authentication required");
  }
}

function attachNavHandlers() {
  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", handleNavigation);
  });
}

function populateDocumentDashboard() {
  const container = document.getElementById("documentDashboard");
  const docs = getData(STORAGE_KEYS.documents);
  const totals = docs.reduce((acc, doc) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1;
    return acc;
  }, {});

  container.innerHTML = Object.entries(totals)
    .map(
      ([category, count]) => `
        <div class="stat">
          <h3>${category}</h3>
          <p class="muted">${count} document${count !== 1 ? "s" : ""}</p>
        </div>
      `
    )
    .join("");
}

function populateBillSummary() {
  const container = document.getElementById("billTrackerSummary");
  const bills = getData(STORAGE_KEYS.bills);
  const totals = billStages.reduce((acc, stage) => {
    acc[stage.id] = bills.filter((bill) => bill.status === stage.id).length;
    return acc;
  }, {});

  container.innerHTML = billStages
    .map(
      (stage) => `
        <div class="stat">
          <h3>${stage.label}</h3>
          <p class="muted">${totals[stage.id] || 0} bill${(totals[stage.id] || 0) !== 1 ? "s" : ""}</p>
        </div>
      `
    )
    .join("");
}

function populateArchivesOverview() {
  const container = document.getElementById("archivesOverview");
  const archives = getData(STORAGE_KEYS.archives);
  container.innerHTML = archives
    .slice(0, 3)
    .map(
      (item) => `
        <article>
          <header>
            <h4>${item.title}</h4>
            <span class="badge">${item.type}</span>
          </header>
          <p class="muted">${item.description}</p>
          <p class="muted">${item.year}</p>
        </article>
      `
    )
    .join("");
}

function renderDocuments() {
  guardAuth();
  render("documentsTemplate");
  attachNavHandlers();
  const categories = deriveCategories();
  const categoryList = document.getElementById("categoryList");
  categoryList.innerHTML = "";

  const googleDocs = getData(STORAGE_KEYS.googleDocs);
  const googleDocList = document.getElementById("googleDocList");
  googleDocList.innerHTML = googleDocs
    .map(
      (doc) => `
        <li>
          <a href="${doc.url}" target="_blank" rel="noopener">
            ${doc.title}
          </a>
          <p class="muted">${doc.description}</p>
        </li>
      `
    )
    .join("");

  const allOption = document.createElement("li");
  allOption.innerHTML = `<button data-category="all" class="${appState.selectedCategory === "all" ? "active" : ""}">All documents</button>`;
  categoryList.appendChild(allOption);

  categories.forEach((category) => {
    const li = document.createElement("li");
    li.innerHTML = `<button data-category="${category}" class="${
      appState.selectedCategory === category ? "active" : ""
    }">${category}</button>`;
    categoryList.appendChild(li);
  });

  categoryList.querySelectorAll("button").forEach((button) =>
    button.addEventListener("click", (event) => {
      appState.selectedCategory = event.target.dataset.category;
      renderDocuments();
    })
  );

  populateDocumentList();
  populateUploadForm(categories);

  const searchInput = document.getElementById("documentSearch");
  searchInput.addEventListener("input", populateDocumentList);
}

function deriveCategories() {
  const docs = getData(STORAGE_KEYS.documents);
  return Array.from(new Set(docs.map((doc) => doc.category))).sort();
}

function populateDocumentList() {
  const docs = getData(STORAGE_KEYS.documents);
  const list = document.getElementById("documentList");
  const selectedTitle = document.getElementById("selectedCategoryTitle");
  const searchTerm = document.getElementById("documentSearch").value.trim().toLowerCase();

  let filtered = docs;
  if (appState.selectedCategory !== "all") {
    filtered = filtered.filter((doc) => doc.category === appState.selectedCategory);
  }
  if (searchTerm) {
    filtered = filtered.filter((doc) => doc.title.toLowerCase().includes(searchTerm));
  }

  selectedTitle.textContent =
    appState.selectedCategory === "all" ? "All Documents" : `${appState.selectedCategory} Documents`;

  list.innerHTML = filtered
    .map(
      (doc) => `
        <li>
          <header>
            <h4>${doc.title}</h4>
            <span class="badge">${doc.category}</span>
          </header>
          <p class="muted">${doc.summary}</p>
          <p class="muted">Maintained by ${doc.owner} &middot; Updated ${doc.updatedAt}</p>
          <a class="btn link" href="https://console.aws.amazon.com/s3/object/${encodeURIComponent(
            doc.s3Key
          )}" target="_blank" rel="noopener">
            Open in AWS S3
          </a>
        </li>
      `
    )
    .join("");
}

function populateUploadForm(categories) {
  const select = document.getElementById("uploadCategory");
  select.innerHTML = categories.map((category) => `<option value="${category}">${category}</option>`).join("");

  const form = document.getElementById("uploadForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("uploadTitle").value.trim();
    const category = document.getElementById("uploadCategory").value;
    const fileInput = document.getElementById("uploadFile");
    const file = fileInput.files[0];
    const confidentiality = document.getElementById("uploadConfidentiality").value;

    if (!file) {
      alert("Select a file to upload.");
      return;
    }

    const documents = getData(STORAGE_KEYS.documents);
    const id = `${category.substring(0, 3).toLowerCase()}-${Date.now()}`;
    const s3Key = `s3://mds-city-storage/${category.toLowerCase().replace(/\s+/g, "-")}/${file.name}`;

    documents.push({
      id,
      title,
      category,
      summary: `${file.name} uploaded as ${confidentiality} visibility`,
      owner: appState.user.name,
      updatedAt: new Date().toISOString().split("T")[0],
      s3Key
    });

    setData(STORAGE_KEYS.documents, documents);
    document.getElementById("uploadResult").textContent =
      "Pre-signed upload link generated. The file will be stored in " + s3Key;
    form.reset();
    populateDocumentList();
  });
}

function renderBills() {
  guardAuth();
  render("billsTemplate");
  attachNavHandlers();
  const filter = document.getElementById("billFilter");
  filter.innerHTML =
    '<option value="all">All statuses</option>' +
    billStages.map((stage) => `<option value="${stage.id}">${stage.label}</option>`).join("");
  filter.addEventListener("change", populateBillList);

  const form = document.getElementById("billForm");
  form.addEventListener("submit", handleBillSubmit);

  populateBillList();
  if (appState.selectedBillId) {
    showBillDetail(appState.selectedBillId);
  }
}

function handleBillSubmit(event) {
  event.preventDefault();
  const title = document.getElementById("billTitle").value.trim();
  const sponsor = document.getElementById("billSponsor").value.trim();
  const summary = document.getElementById("billSummary").value.trim();
  const fileInput = document.getElementById("billFile");

  if (!fileInput.files[0]) {
    alert("Please attach a PDF of the legislation.");
    return;
  }

  const bills = getData(STORAGE_KEYS.bills);
  const id = `B-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`;
  const newBill = {
    id,
    title,
    sponsor,
    summary,
    status: "submitted",
    history: [{ stage: "submitted", date: new Date().toISOString().split("T")[0] }],
    fileName: fileInput.files[0].name,
    repealed: false
  };
  bills.push(newBill);
  setData(STORAGE_KEYS.bills, bills);
  event.target.reset();
  populateBillList();
  showBillDetail(newBill.id);
}

function populateBillList() {
  const bills = getData(STORAGE_KEYS.bills);
  const filter = document.getElementById("billFilter").value;
  const list = document.getElementById("billList");
  let filtered = bills;
  if (filter !== "all") {
    filtered = bills.filter((bill) => bill.status === filter);
  }

  list.innerHTML = filtered
    .map(
      (bill) => `
        <li data-bill-id="${bill.id}" class="${appState.selectedBillId === bill.id ? "active" : ""}">
          <header>
            <div>
              <h4>${bill.id} &middot; ${bill.title}</h4>
              <p class="muted">Sponsor: ${bill.sponsor}</p>
            </div>
            <span class="badge${bill.repealed ? " repealed" : ""}">
              ${bill.repealed ? "Repealed" : stageLabel(bill.status)}
            </span>
          </header>
          <p class="muted">${bill.summary}</p>
        </li>
      `
    )
    .join("");

  list.querySelectorAll("li").forEach((item) =>
    item.addEventListener("click", () => {
      const billId = item.dataset.billId;
      appState.selectedBillId = billId;
      list.querySelectorAll("li").forEach((li) => li.classList.remove("active"));
      item.classList.add("active");
      showBillDetail(billId);
    })
  );
}

function stageLabel(stageId) {
  const stage = billStages.find((s) => s.id === stageId);
  return stage ? stage.label : stageId;
}

function showBillDetail(billId) {
  const bills = getData(STORAGE_KEYS.bills);
  const bill = bills.find((b) => b.id === billId);
  if (!bill) return;

  const detail = document.getElementById("billDetail");
  const placeholder = document.getElementById("billDetailPlaceholder");
  placeholder.hidden = true;
  detail.hidden = false;

  const progress = billStages
    .map(
      (stage) => `
        <div class="progress-step${bill.status === stage.id || bill.history.some((h) => h.stage === stage.id) ? " active" : ""}">
          ${stage.label}
        </div>
      `
    )
    .join("");

  const historyList = bill.history
    .map((entry) => `<li>${stageLabel(entry.stage)} &middot; ${entry.date}</li>`)
    .join("");

  detail.innerHTML = `
    <header>
      <h3>${bill.title}</h3>
      <p class="muted">${bill.id} &middot; Sponsored by ${bill.sponsor}</p>
    </header>
    <p>${bill.summary}</p>
    <div class="progress-bar" aria-label="Bill progress">${progress}</div>
    <section>
      <h4>Status management</h4>
      <label class="form-field">
        <span>Current stage</span>
        <select id="billStatusSelect">
          ${billStages
            .map((stage) => `<option value="${stage.id}" ${bill.status === stage.id ? "selected" : ""}>${stage.label}</option>`)
            .join("")}
        </select>
      </label>
      <label class="form-field">
        <span class="sr-only">Mark legislation as repealed</span>
        <input type="checkbox" id="billRepealed" ${bill.repealed ? "checked" : ""} />
        <span>Mark as repealed</span>
      </label>
      <button class="btn primary" id="billUpdate">Update status</button>
    </section>
    <section>
      <h4>Bill materials</h4>
      <p class="muted">PDF attachment: ${bill.fileName}</p>
      <a class="btn link" href="https://s3.console.aws.amazon.com/s3/object/mds-city-storage/${encodeURIComponent(
        bill.fileName
      )}" target="_blank" rel="noopener">Open legislation PDF</a>
    </section>
    <section>
      <h4>History</h4>
      <ul>${historyList}</ul>
    </section>
  `;

  document.getElementById("billUpdate").addEventListener("click", () => updateBill(billId));
}

function updateBill(billId) {
  const bills = getData(STORAGE_KEYS.bills);
  const bill = bills.find((b) => b.id === billId);
  if (!bill) return;

  const newStatus = document.getElementById("billStatusSelect").value;
  const repealed = document.getElementById("billRepealed").checked;

  if (bill.status !== newStatus) {
    bill.status = newStatus;
    bill.history.push({ stage: newStatus, date: new Date().toISOString().split("T")[0] });
  }

  bill.repealed = repealed;
  setData(STORAGE_KEYS.bills, bills);
  populateBillList();
  showBillDetail(billId);
}

function renderArchives() {
  guardAuth();
  render("archivesTemplate");
  attachNavHandlers();
  const archives = getData(STORAGE_KEYS.archives);
  const typeFilter = document.getElementById("archiveTypeFilter");
  const types = Array.from(new Set(archives.map((archive) => archive.type)));
  typeFilter.innerHTML = '<option value="all">All</option>' + types.map((type) => `<option value="${type}">${type}</option>`);
  typeFilter.addEventListener("change", populateArchiveList);
  document.getElementById("archiveSearch").addEventListener("input", populateArchiveList);
  populateArchiveList();
}

function populateArchiveList() {
  const archives = getData(STORAGE_KEYS.archives);
  const type = document.getElementById("archiveTypeFilter").value;
  const query = document.getElementById("archiveSearch").value.trim().toLowerCase();
  const list = document.getElementById("archiveList");

  let filtered = archives;
  if (type !== "all") {
    filtered = filtered.filter((archive) => archive.type === type);
  }
  if (query) {
    filtered = filtered.filter(
      (archive) =>
        archive.title.toLowerCase().includes(query) || archive.description.toLowerCase().includes(query)
    );
  }

  list.innerHTML = filtered
    .map(
      (archive) => `
        <li>
          <header>
            <h4>${archive.title}</h4>
            <span class="badge">${archive.type}</span>
          </header>
          <p class="muted">${archive.description}</p>
          <p class="muted">Year ${archive.year}</p>
          <a class="btn link" href="${archive.url}" target="_blank" rel="noopener">Open archive</a>
        </li>
      `
    )
    .join("");
}

function renderPublic() {
  render("publicTemplate");
  attachNavHandlers();
  const googleDocs = getData(STORAGE_KEYS.googleDocs);
  const charter = googleDocs.find((doc) => doc.id === "doc-charter");
  const charterEmbed = document.getElementById("charterEmbed");
  if (charter) {
    charterEmbed.innerHTML = `
      <iframe src="${charter.url}" title="New Philadelphia Municipal Charter"></iframe>
      <p class="muted">
        Open in Google Docs: <a href="${charter.url}" target="_blank" rel="noopener">${charter.title}</a>
      </p>
    `;
  }

  const bills = getData(STORAGE_KEYS.bills).filter((bill) => bill.status === "passed");
  const publicLegislation = document.getElementById("publicLegislation");
  publicLegislation.innerHTML = bills
    .map(
      (bill) => `
        <li>
          <header>
            <h4>${bill.title}</h4>
            <span class="badge${bill.repealed ? " repealed" : ""}">${bill.repealed ? "Repealed" : "Active"}</span>
          </header>
          <p class="muted">Bill ${bill.id} &middot; Sponsor: ${bill.sponsor}</p>
          <p class="muted">${bill.summary}</p>
          <a class="btn link" href="https://s3.console.aws.amazon.com/s3/object/mds-city-storage/${encodeURIComponent(
            bill.fileName
          )}" target="_blank" rel="noopener">View PDF</a>
        </li>
      `
    )
    .join("");

  const cases = getData(STORAGE_KEYS.cases);
  const jurisprudenceList = document.getElementById("publicJurisprudence");
  jurisprudenceList.innerHTML = cases
    .map(
      (caseItem) => `
        <li>
          <header>
            <h4>${caseItem.title}</h4>
            <span class="badge">${caseItem.docket}</span>
          </header>
          <p class="muted">Decided ${caseItem.date}</p>
          <p>${caseItem.summary}</p>
          <p class="muted">Judges: ${caseItem.judges.join(", ")}</p>
        </li>
      `
    )
    .join("");

  const polls = getData(STORAGE_KEYS.polls);
  const pollsList = document.getElementById("publicPolls");
  pollsList.innerHTML = polls
    .map(
      (poll) => `
        <li>
          <h4>${poll.question}</h4>
          <p class="muted">Opened ${poll.opened} &middot; Closed ${poll.closed}</p>
          <p>Outcome: ${poll.result}</p>
          <p class="muted">Participants: ${poll.participants.toLocaleString()}</p>
        </li>
      `
    )
    .join("");
}

function renderJurisprudence() {
  guardAuth();
  render("jurisprudenceTemplate");
  attachNavHandlers();
  const cases = getData(STORAGE_KEYS.cases);
  const caseList = document.getElementById("caseList");
  caseList.innerHTML = cases
    .map(
      (caseItem) => `
        <li data-case-id="${caseItem.id}" class="${appState.selectedCaseId === caseItem.id ? "active" : ""}">
          <h4>${caseItem.title}</h4>
          <p class="muted">${caseItem.docket}</p>
        </li>
      `
    )
    .join("");

  caseList.querySelectorAll("li").forEach((item) =>
    item.addEventListener("click", () => {
      const caseId = item.dataset.caseId;
      appState.selectedCaseId = caseId;
      caseList.querySelectorAll("li").forEach((li) => li.classList.remove("active"));
      item.classList.add("active");
      showCaseDetail(caseId);
    })
  );

  if (appState.selectedCaseId) {
    showCaseDetail(appState.selectedCaseId);
  }
}

function showCaseDetail(caseId) {
  const cases = getData(STORAGE_KEYS.cases);
  const caseItem = cases.find((c) => c.id === caseId);
  if (!caseItem) return;

  const detail = document.getElementById("caseDetail");
  detail.innerHTML = `
    <header>
      <h3>${caseItem.title}</h3>
      <p class="muted">Docket ${caseItem.docket} &middot; Decided ${caseItem.date}</p>
    </header>
    <section>
      <h4>Summary</h4>
      <p>${caseItem.summary}</p>
    </section>
    <section>
      <h4>Holding</h4>
      <p>${caseItem.holding}</p>
    </section>
    <section>
      <h4>Presiding judges</h4>
      <ul>${caseItem.judges.map((judge) => `<li>${judge}</li>`).join("")}</ul>
    </section>
  `;
}

function renderAdmin() {
  guardAuth();
  if (appState.user.role !== "ccomm") {
    alert("Admin access restricted to City Communications Office staff.");
    renderDashboard();
    return;
  }

  render("adminTemplate");
  attachNavHandlers();
  populateUserList();
  const form = document.getElementById("userForm");
  form.addEventListener("submit", handleUserSave);
  document.getElementById("deleteUser").addEventListener("click", handleUserDelete);
}

function populateUserList() {
  const users = getData(STORAGE_KEYS.users);
  const list = document.getElementById("userList");
  list.innerHTML = users
    .map(
      (user) => `
        <li data-user-email="${user.email}">
          <header>
            <h4>${user.name}</h4>
            <span class="badge">${roleLabel(user.role)}</span>
          </header>
          <p class="muted">${user.email}</p>
        </li>
      `
    )
    .join("");

  list.querySelectorAll("li").forEach((item) =>
    item.addEventListener("click", () => {
      const email = item.dataset.userEmail;
      appState.selectedUserEmail = email;
      const users = getData(STORAGE_KEYS.users);
      const user = users.find((u) => u.email === email);
      if (!user) return;
      document.getElementById("userName").value = user.name;
      document.getElementById("userEmail").value = user.email;
      document.getElementById("userRole").value = user.role;
      document.getElementById("userPassword").value = user.password;
    })
  );
}

function handleUserSave(event) {
  event.preventDefault();
  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim().toLowerCase();
  const role = document.getElementById("userRole").value;
  const password = document.getElementById("userPassword").value.trim();

  if (!name || !email || !role || !password) {
    alert("Complete all required fields.");
    return;
  }

  const users = getData(STORAGE_KEYS.users);
  const existingIndex = users.findIndex((u) => u.email === email);
  const user = { name, email, role, password };

  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }

  setData(STORAGE_KEYS.users, users);
  populateUserList();
  event.target.reset();
  appState.selectedUserEmail = null;
}

function handleUserDelete() {
  if (!appState.selectedUserEmail) {
    alert("Select a user to remove.");
    return;
  }
  const users = getData(STORAGE_KEYS.users);
  const filtered = users.filter((user) => user.email !== appState.selectedUserEmail);
  setData(STORAGE_KEYS.users, filtered);
  populateUserList();
  document.getElementById("userForm").reset();
  appState.selectedUserEmail = null;
}

function renderPolls() {
  guardAuth();
  render("pollsTemplate");
  attachNavHandlers();
  const polls = getData(STORAGE_KEYS.polls);
  const list = document.getElementById("pollsList");
  list.innerHTML = polls
    .map(
      (poll) => `
        <article>
          <h3>${poll.question}</h3>
          <div class="poll-meta">
            <span>Opened ${poll.opened}</span>
            <span>Closed ${poll.closed}</span>
            <span>${poll.participants.toLocaleString()} participants</span>
          </div>
          <p><strong>Outcome:</strong> ${poll.result}</p>
        </article>
      `
    )
    .join("");
}

function restoreSession() {
  const session = getSession();
  if (session) {
    appState.user = session;
    appState.view = "dashboard";
    setTopNav();
    renderDashboard();
    return true;
  }
  return false;
}

function initialize() {
  initTemplates();
  initSeedData();
  document.getElementById("currentYear").textContent = new Date().getFullYear();
  document.addEventListener("click", handleNavigation);
  if (!restoreSession()) {
    renderLogin();
    setTopNav();
  }
}

initialize();
