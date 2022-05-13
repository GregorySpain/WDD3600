# WDD3600

This is the beginning of an ecommerce site from the complete node.js tutorial.

To deploy, follow these steps:

1. Clone or download data from GitHub.
2. Run the npm install utility to install all needed 
   packages.
3. run 'npm start' to launch app.
4. Visit localhost:3000 in your browser to view.

This app is a work in progress and will be updated weekly with new features.

There are several locations throughout where you will need to provide your own credentials.

# File Structure

**controllers**
   admin.js
   auth.js
   error.js
   shop.js

**data**
   **invoices**

**middleware**
   is-auth.js

**models**
   order.js
   product.js
   user.js

**public**
   **css**
      auth.css
      cart.css
      forms.css
      main.css
      orders.css
      products.css
   **js**
      admin.js
      main.js

**routes**
   admin.js
   auth.js
   shop.js

**util**
   file.js
   path.js

**views**
   **admin**
      edit-product.ejs
      products.ejs
   **auth**
      login.ejs
      new-password.ejs
      reset.ejs
      signup.ejs
   **includes**
      add-to-cart.ejs
      end.ejs
      head.ejs
      navigation.ejs
      pagination.ejs
   **shop**
      cart.ejs
      checkout.ejs
      index.ejs
      orders.ejs
      product-detail.ejs
      product-list.ejs
   404.ejs
   500.ejs

app.js
package-lock.json
package.json
README.md

# Database Structure

**Schema: shop**

   **orders**

      _id: ObjectId

      products: [ { Product Object(s) } ]

      user: { User Object }

   **products**
   
      _id: ObjectId
      title: String
      price: Number
      description: String
      imageUrl: String
      userId: ObjectId

   **sessions**
      _id: ObjectId
      expires: { Date Object }
      session: {
         cookie: { Cookie Object }
         csrf secret: String
         flash: Flash Object
         isLoggedIn: Boolean
         user: { User Object }
      }

   **users**
      email: String
      password: String
      resetToke: String
      resetTokenExpiration: { Date Object }
      cart: {
         items: [
            {
               productId: ObjectId
               quantity: Number
            }
         ]
      }
