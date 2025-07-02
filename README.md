# 📇 Contact Identification Service – FluxKart.com

A backend API built using **Node.js**, **Express**, **TypeScript**, and **MongoDB** to identify and consolidate customer contacts based on `email` and/or `phoneNumber`.

> This service is used by **Bitespeed** to track a user's identity across multiple purchases, ensuring the same customer is recognized regardless of the contact information they use.

---

## 📁 Folder Structure

```
contact-identify-service/
├── dist/ # Compiled JS files (after build)
├── node_modules/
├── src/
│ ├── apps/
│ │ ├── controllers/
│ │ │ ├── contact.controller.ts
│ │ │ └── contact.controller.test.ts
│ │ ├── models/
│ │ │ └── contact.model.ts
│ │ ├── repositories/
│ │ │ ├── contact.repository.ts
│ │ │ └── contact.repository.test.ts
│ │ ├── routers/
│ │ │ └── contact.route.ts
│ │ └── usecases/
│ │ ├── contact.usecase.ts
│ │ └── contact.usecase.test.ts
│ ├── infrastructure/
│ │ ├── constants.ts
│ │ └── swaggerConfig.ts
│ ├── middlewares/
│ │ └── error.middleware.ts
│ ├── utils/
│ │ └── throw-error.utils.ts
│ └── index.ts
├── .env
├── .gitignore
├── babel.config.json
├── jest.config.ts
├── package-lock.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🧩 Use Case

FluxKart collects either `email` or `phoneNumber` during checkout. Over time, a user may checkout with different combinations of these details.  
This service consolidates such data into a **single primary contact**, linking other contacts as **secondary**.



Each contact is stored in a `Contact` collection:

```ts
{
  id: number,
  phoneNumber?: string,
  email?: string,
  linkedId?: number,
  linkPrecedence: "primary" | "secondary",
  createdAt: Date,
  updatedAt: Date,
  deletedAt?: Date
}
```

---

## 🚀 Getting Started

### ✅ 1. Install & Setup

```bash
npm install
```

### 🛠️ 2. Setup Environment

Create a `.env` file with:

```
PORT=3000
MONGO_URI=mongodb+srv://sshaiknagulmeera9:********@cluster0.krharly.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

### ▶️ 3. Start the Server

```bash
npm start
```



### 📑 4. Open Swagger Docs

- **Local**: `http://localhost:3000/api-docs`
- **Production**: `https://contact-identify-service.onrender.com/api-docs`


---

## 🔥 API: `/api/identify`

### 🧾 Request Format

```json
POST /api/identify
{
  "email": "example@domain.com",     
  "phoneNumber": "1234567890"        
}
```

At least one of `email` or `phoneNumber` must be provided.

### ✅ Successful Response

```json
{
  "contact": {
    "primaryContatctId": 1,
    "emails": ["example@domain.com", "alt@domain.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": [2, 3]
  }
}
```

---

## 📖 Behavior Scenarios

### 📌 1. New Contact (No Match)

#### Request:

```json
{ "email": "newuser@domain.com", "phoneNumber": "9999999999" }
```

#### Action:

- Creates a new contact with `linkPrecedence: "primary"`

#### Response:

```json
{
  "contact": {
    "primaryContatctId": 101,
    "emails": ["newuser@domain.com"],
    "phoneNumbers": ["9999999999"],
    "secondaryContactIds": []
  }
}
```

---

### 📌 2. Existing Match by Phone or Email (New Info)

#### Database:

```json
[
  {
    "id": 1,
    "email": "lorraine@hillvalley.edu",
    "phoneNumber": "123456",
    "linkPrecedence": "primary"
  }
]
```

#### Request:

```json
{ "email": "mcfly@hillvalley.edu", "phoneNumber": "123456" }
```

#### Action:

- New secondary contact created and linked to ID `1`

#### Response:

```json
{
  "contact": {
    "primaryContatctId": 1,
    "emails": ["lorraine@hillvalley.edu", "mcfly@hillvalley.edu"],
    "phoneNumbers": ["123456"],
    "secondaryContactIds": [23]
  }
}
```

---

### 📌 3. Exact Contact Already Exists

#### Request:

```json
{ "email": "lorraine@hillvalley.edu", "phoneNumber": "123456" }
```

#### Action:

- No new contact created.

---

### 📌 4. Linking Multiple Existing Primaries

#### Database Before:

```json
[
  { "id": 11, "email": "george@hillvalley.edu", "phoneNumber": "919191", "linkPrecedence": "primary" },
  { "id": 27, "email": "biffsucks@hillvalley.edu", "phoneNumber": "717171", "linkPrecedence": "primary" }
]
```

#### Request:

```json
{ "email": "george@hillvalley.edu", "phoneNumber": "717171" }
```

#### Action:

- Both primaries detected.
- Older contact (ID `11`) retained as `primary`.
- Newer contact (ID `27`) downgraded to `secondary`.

#### Final Response:

```json
{
  "contact": {
    "primaryContatctId": 11,
    "emails": ["george@hillvalley.edu", "biffsucks@hillvalley.edu"],
    "phoneNumbers": ["919191", "717171"],
    "secondaryContactIds": [27]
  }
}
```

---

### 📌 5. Partial Match with Only Email or Phone

All of these requests below will give **the same result** as above if already linked:

```json
{ "email": "mcfly@hillvalley.edu", "phoneNumber": null }
{ "email": null, "phoneNumber": "123456" }
{ "email": "lorraine@hillvalley.edu", "phoneNumber": null }
```

---

## 🧪 Testing

Run tests:

```bash
npx jest
```

Includes unit tests for:

- Use cases
- Consolidation logic
- Primary-secondary switching

---

## 📦 Tech Stack

- ✅ Node.js + Express
- ✅ MongoDB + Mongoose
- ✅ TypeScript
- ✅ Swagger (API Docs)
- ✅ Jest (Unit Tests)

---

## 👨‍💻 Author

**Nagulmeera Shaik**  
> [LinkedIn](https://www.linkedin.com/in/nagulmeera-shaik-384200229/) 

---


