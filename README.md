# **Lamastore+**

A retooling/extension of the [Lamastore](https://github.com/safak/youtube2022/tree/ecommerce) ecommerce project using [Next.js](https://nextjs.org/) 13 and [Tailwind CSS](https://tailwindcss.com/). Created by [Lama Dev](https://www.youtube.com/@LamaDev/featured); the video tutorial for the original React project can be found [here](https://www.youtube.com/watch?v=BCkWFblNLKU).

- [Description](#description)
- [Requirements](#requirements)
  - [Environment Variables](#environment-variables)
- [Installation and setup](#installation-and-setup)
  - [Install](#install)
  - [Development](#development)
  - [Production](#production)
- [License](#license)

## **Description**

This project makes use of newer Next.js features such as the `/app` directory, layouts, and server components.

For content management, a [Strapi](https://strapi.io/) backend is used for the purposes of storing product, user, and order data. The CMS also serves as an API for providing auth tokens and making Stripe related requests. The repo containing the Strapi API for this project can be found here [here](https://github.com/antmercado94/lamastoreplus-api).

[NextAuth.js](https://next-auth.js.org/) is used to provide authentication between the Strapi backend and the client, which will enable authenticated users to make purchases or manage their orders through [Stripe](https://stripe.com/).

A bit more detail about the development of this project can be found at my website, [here](https://amdev.work/blog/?post=lamastoreplus&id=e85ca83d-005b-5a70-91b2-710a05c48174/).

## **Requirements**

### **Environment Variables**

A number of API and NextAuth related env variables must be set in order for this project to start. Use the provided [`.env.example`](https://github.com/antmercado94/lamastoreplus/blob/main/.env.example) file to view all necessary vars and how to provide them.

## **Installation and setup**

### **Install**

- [Download zip](https://github.com/antmercado94/lamastoreplus/archive/refs/heads/main.zip) or clone: `git clone https://github.com/antmercado94/lamastoreplus.git`
- Install dependencies using a package manager, e.g., npm: `npm install`

### **Development**

Run a development server using the `dev` script command:

```bash
#npm:
npm run dev
```

### **Production**

Information regarding how to deploy a Next.js application can be found on the Next.js [Docs](https://nextjs.org/docs/pages/building-your-application/deploying).

## **License**

Code released under [the MIT license](https://github.com/antmercado94/lamastoreplus/blob/main/LICENSE).
