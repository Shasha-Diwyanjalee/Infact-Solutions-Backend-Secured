const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const helmet = require("helmet");


require("./utils/auth.config");
const PORT = process.env.PORT || 8070;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

//Sanitize data
app.use(
  mongoSanitize({
    replaceWith: "_",
    allowDots: true,
  })
);

//Prevent XSS attacks
app.use(xss());

// Use Helmet!
app.use(helmet());

const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  origin: "http://localhost:3000", 
  credentials: true, 
};

// Apply CORS middleware before defining routes
app.use(cors(corsOptions));

// Cookie parser
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET, //authenticate a session( symmetric key )
    resave: false, //session never modified during the request
    saveUninitialized: true, //when a session is created new but not modified( make multiple parallel requests without a session)
    cookie: {
      httpOnly: true, //only allow http requests
      maxAge: 3600000 // one hour
    }
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

const URL = process.env.MONGODB_URL;
process.env.SUPPRESS_NO_CONFIG_WARNING = "y";

mongoose.connect(URL, {
  //useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb connection success!!!");
});

// app.use(cookieParser());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// @import routes
const customerRouter = require("./routes/DH_routes/customer");
const adminRouter = require("./routes/NT_routes/admin");
const discountRouter = require("./routes/NT_routes/discount");
const productRoutes = require("./routes/SS_routes/products");
const deliveryRoutes = require("./routes/RD_routes/deliverys");
const hRoutes = require("./routes/RD_routes/HOrders");
const orderRoutes = require("./routes/ND_routes/Order");
const cartRoutes = require("./routes/ND_routes/Cart");
const purchasehistoryRoutes = require("./routes/DH_routes/purchasehistory.route");
const requestRoutes = require("./routes/IS_routes/requests");
const wishListRoute = require("./routes/DH_routes/wishlist");
const feedbackRoutes = require("./routes/AA_routes/feedbacks");
const chartroutes = require("./routes/AA_routes/admin_dashboard.route");
const adRoutes = require("./routes/RS_routes/ads");

// report generate routes
const discountPDFRoutes = require("./routes/PDF_Generator/discount_report");
app.use(discountPDFRoutes);
const productPDFRoutes = require("./routes/PDF_Generator/products-report");
app.use(productPDFRoutes);
const deliverypdfRoutes = require("./routes/PDF_Generator/deliverys_report");
app.use(deliverypdfRoutes);
const requestPDFRoutes = require("./routes/PDF_Generator/request_report");
app.use(requestPDFRoutes);
const wishlistPDFRoutes = require("./routes/PDF_Generator/wishlist_report");
app.use(wishlistPDFRoutes);
const feedbackPDFRoutes = require("./routes/PDF_Generator/feedback_report");
app.use(feedbackPDFRoutes);
const AdsPDFRoutes = require("./routes/PDF_Generator/ads_report");
const AuthRouter = require("./routes/DH_routes/auth.routes");
app.use(AdsPDFRoutes);

// rotues
app.use("/customer", customerRouter);
app.use("/admin", adminRouter);
app.use("/discount", discountRouter);
app.use("/products", productRoutes);
app.use("/deliverys", deliveryRoutes);
app.use("/order", orderRoutes);
app.use("/HOrders", hRoutes);
app.use("/cart", cartRoutes);
app.use("/purchasehistory", purchasehistoryRoutes);
app.use("/requests", requestRoutes);
app.use("/wishlist", wishListRoute);
app.use("/feedbacks", feedbackRoutes);
app.use("/admin", chartroutes);
app.use("/ads", adRoutes);
app.use("/auth", AuthRouter);
app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
