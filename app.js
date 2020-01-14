//https://w3path.com/node-js-crud-operation-with-express-and-mysql-database/

var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');


var createError = require('http-errors');
 //var express = require('express');
 var path = require('path');
 //var cookieParser = require('cookie-parser');
 //var logger = require('morgan');
 var expressValidator = require('express-validator');
 var flash = require('express-flash');
 var session = require('express-session');
 //var bodyParser = require('body-parser');

 app.use(session({
      secret: '123456cat',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 60000 }
  }))

  app.use(flash());
  //app.use(expressValidator());
// connection configurations
var dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'krishna',
  database: 'dbFive'
  /*  host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_js_api'
    */
});

// connect to database
dbConn.connect();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('view engine', 'ejs');


const expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash");
app.use(cookieParser("secret_passcode"));
app.use(expressSession({
  secret: "secret_passcode",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));
//app.use(connectFlash());
app.use(flash());




//rest api to get billHistory
app.get('/vendorBillHistory', function (req, res) {
   console.log(req);
   dbConn.query('select * from addingVendor_BillHistoryB', function (error, results, fields) {
	  if (error) throw error;
    res.render('vendor/billHistory',{page_title:"addingVendor_BillHistory - Node.js",data:results});
	  //res.end(JSON.stringify(results));
	});
});

//rest api to get VendorAddedCosts
app.get('/VendorAddedCosts', function (req, res) {
   console.log(req);
   dbConn.query('select * from addingVendor_addedCosts', function (error, results, fields) {
	  if (error) throw error;
    res.render('vendor/vendorAddedCosts',{page_title:"VendorAddedCosts - Node.js",data:results});
	  //res.end(JSON.stringify(results));
	});
});

//rest api to get VendorAddedCosts
app.get('/VendorAddedCosts', function (req, res) {
   console.log(req);
   dbConn.query('select * from addingVendor_addedCosts', function (error, results, fields) {
	  if (error) throw error;
    res.render('vendor/vendorAddedCosts',{page_title:"VendorAddedCosts - Node.js",data:results});
	  //res.end(JSON.stringify(results));
	});
});

//rest api to get VendorAddedCosts
app.get('/VendorGLPostsOne', function (req, res) {
   console.log(req);
   dbConn.query('select * from addingVendor_GLPostsOne', function (error, results, fields) {
	  if (error) throw error;
    res.render('vendor/vendorGLPostsOne',{page_title:"addingVendorGLPostsOne - Node.js",data:results});
	  //res.end(JSON.stringify(results));
	});
});






//rest api to get vendorGeneralInformation
app.get('/selectVendorGeneralInformation', function (req, res) {
   console.log(req);
   dbConn.query('select id, name, isActive, street, zip, city, state, phone, phoneTwo, fax, contact, email, categoryId, accountNumber, defaultGLAccount from vendorGeneralInformationC', function (error, results, fields) {
      if (error) throw error;
        res.render('vendor/selectVendorGeneralInformation',{page_title:"selectVendorGeneralInformation - Node.js",data:results});
    //  res.end(JSON.stringify(results));
    });
});

app.post('/createVendorBillHistory', function(req, res, next) {
var vendorId = req.body.vendorId;
var stockNumberId = req.body.stockNumberId;
var isAddToBill = req.body.isAddToBill;
var date = req.body.date;
var purchaseDate = req.body.purchaseDate;
var dateDue = req.body.dateDue;
//var datePaid = req.body.datePaid;
var datePaid = "";
var amount = req.body.amount;
var invoice = req.body.invoice;
var status = req.body.status;
var checkNumber = req.body.checkNumber;
//var isCleared = req.body.isCleared;
var isCleared = 0;
var checkMemo = req.body.checkMemo;


//vendorId,date,dateDue,datePaid,amount,invoice,status,checkNumber,isCleared,checkMemo
var sql = `INSERT INTO addingVendor_BillHistoryB (vendorId,stockNumberId,isAddToBill,date,purchaseDate,dateDue,datePaid,amount,invoice,status,checkNumber,isCleared,checkMemo) VALUES ("${vendorId}", "${stockNumberId}", "${isAddToBill}", "${date}", "${purchaseDate}", "${dateDue}", "${datePaid}","${amount}","${invoice}","${status}","${checkNumber}","${isCleared}","${checkMemo}")`;
  dbConn.query(sql, function(err, result) {
        console.log(req.body);
    if(err) {

    //  res.status(500).send({ error: 'Something failed!' })
    }
    else{

      res.render('vendor/addingVehicle_General', {
          title: 'Form for addingVehicle_General'
      })
    }
  //  res.json({'status': 'success', id: result.insertId})
  })
});

//rest api to get vendorGeneralInformation
app.get('/vendorGeneralInformation', function (req, res) {
   console.log(req);
   dbConn.query('select * from vendorGeneralInformationC', function (error, results, fields) {
      if (error) throw error;
        res.render('vendor/vendorGeneralInformationC',{page_title:"vendorGeneralInformationC - Node.js",data:results});
    //  res.end(JSON.stringify(results));
    });
});



// SHOW ADD USER FORM
app.get('/addingVendor_General', function(req, res, next){
    // render to views/user/add.ejs
    res.render('vendor/addingVendor_General', {
        title: 'Form for addingVendor_General'
    })
})


app.get('/test', function(req, res, next){
    // render to views/user/add.ejs
    res.render('vendor/testOne', {
        title: 'Form for addingVendor_General'
    })
})


app.get('/testTwo', function(req, res, next){
    // render to views/user/add.ejs
    res.render('vendor/testTwo', {
        title: 'Form for addingVendor_General'
    })
})

// SHOW ADD USER FORM
app.get('/addingVehicle_General', function(req, res, next){
    // render to views/user/add.ejs
    res.render('vendor/addingVehicle_General', {
        title: 'Form for addingVehicle_General'
    })
})

app.get('/addingVehicle', function(req, res, next){
    // render to views/user/add.ejs
    res.render('vendor/addingVehicle', {
        title: 'Form for addingVehicle'
    })
})




app.post('/save_addingVendor_General', function(req, res, next){
  //  req.check('name', 'Name is required').notEmpty()           //Validate name
  //  req.check('email', 'A valid email is required').isEmail()  //Validate email
//let name = req.body.name;
//let email = req.body.email;

    //var errors = req.validationErrors()
    console.log(req.body);
        console.log('Input:: name='+req.body.name+'  email='+ req.body.email);
  //  var sql = "insert into custName(name,email) values('"+ req.body.name +"','"+ req.body.email +"')";
//  var sql = `INSERT INTO customerTwo (name, active, street, zip, city, state, phone, phone2, fax, contact, email, category, accoutNumber,  defaultGLAccount, nameToPrintOnCheck, mailingName, mailingStreet, mailingCityStateZip, federalIdentificationOrSocialSecurityNumber) VALUES
//     ("${name}", "${active}", "${street}", "${zip}","${city}","${state}","${phone}","${phone2}","${fax}","${contact}","${email}","${category}","${accoutNumber}","${defaultGLAccount}","${nameToPrintOnCheck}","${mailingName}","${mailingStreet}","${mailingCityStateZip}","${federalIdentificationOrSocialSecurityNumber}")`;
 //var sql = 'insert into custName(name,email) values("${name}", "${email}")';
//var sql = `INSERT INTO custName (name, email) VALUES ("${name}", "${email}")`;  undefined getting inserted
//var sql = `INSERT INTO custName (name, email) VALUES ("${name}", "${email}")`;
// var sql = 'insert into custName(name,email) values ('" + name + "', '" + email + "')';  SyntaxError: Unexpected string
// var sql = "insert into custName(name,email) values ('" + name + "', '" + email + "')";

//var sql = `INSERT INTO custName (name, email) VALUES ("${name}", "${email}")`;
var name = req.body.name;
var isActive = req.body.isActive;
var street = req.body.street;
var zip = req.body.zip;
var city = req.body.city;
var state = req.body.state;
var phone = req.body.phone;
var phoneTwo = req.body.phoneTwo;
var fax = req.body.fax;


//name,isActive,street,zip,city,state,phone,phoneTwo,fax,contact,email,categoryId,accoutNumber,defaultGLAccount,nameToPrintOnCheckOr1099,mailingName,mailingStreet,mailingCityStateZip,socialSecurityNumber,isNon1099Vendor,notes
var contact = req.body.contact;
var email = req.body.email;
var categoryId = req.body.categoryId;
var accountNumber = req.body.accoutNumber;
var defaultGLAccount = req.body.defaultGLAccount;
var nameToPrintOnCheckOr1099 = req.body.nameToPrintOnCheckOr1099;
var mailingName = req.body.mailingName;
var mailingStreet = req.body.mailingStreet;
var mailingCityStateZip = req.body.mailingCityStateZip;
var socialSecurityNumber = req.body.socialSecurityNumber;
var isNon1099Vendor = req.body.isNon1099Vendor;
var notes = req.body.notes;

var sql = `INSERT INTO vendorGeneralInformationC (name,isActive,street,zip,city,state,phone,phoneTwo,fax,contact,email,categoryId,accountNumber,defaultGLAccount,nameToPrintOnCheckOr1099,mailingName,mailingStreet,mailingCityStateZip,socialSecurityNumber,isNon1099Vendor,notes) VALUES ("${name}", "${isActive}", "${street}", "${zip}","${city}","${state}","${phone}","${phoneTwo}","${fax}","${contact}","${email}","${categoryId}","${accountNumber}","${defaultGLAccount}","${nameToPrintOnCheckOr1099}","${mailingName}","${mailingStreet}","${mailingCityStateZip}","${socialSecurityNumber}","${isNon1099Vendor}","${notes}")`;

console.log("Query :" + sql );
    dbConn.query(sql, function (error, results, fields) {
    console.log(JSON.stringify(results));
    if(error){
        req.flash("errorMessage", `${name}'s account not created!`);
        res.locals.messageError = req.flash();
    }else{
      req.flash("successMessage", `${name}'s account created successfully!`);
      res.locals.messageSuccess = req.flash();

      res.render('vendor/addingVendor_General', {
          title: 'Form for addingVendor_General'
        })

      //  res.redirect('/addingVendor_General');
    //    res.locals.messageSuccess = req.flash();

    }


   });


})


app.post('/createAddingVehicleGeneralTen', function(req, res, next) {


//https://forums.mysql.com/read.php?51,506541,506541
//SELECT column_name from information_schema.columns where table_schema = "dbOne" and table_name = "addingVehicle_General";

var mileage = req.body.mileage;
var isExempt = req.body.isExempt;
var locationCode = req.body.locationCode;
var mileageIs = req.body.mileageIs;
 var newOrUseOrRebuilt = req.body.newOrUseOrRebuilt;
 var isCertified = req.body.isCertified;
 var vin = req.body.vin;

 var year = req.body.year;
 var transmission = req.body.transmission;
 var transpeed = req.body.transpeed;
var driveTrain = req.body.driveTrain;

var make = req.body.make;
 var model = req.body.model;
 var style = req.body.style;
var  bodyType = req.body.bodyType;
var  exteriorColor = req.body.exteriorColor;
var  exteriorColorTwo = req.body.exteriorColorTwo;
var  colorDescription = req.body.colorDescription;
 var interiorColor = req.body.interiorColor;
var  tag = req.body.tag;
 var decalNumber = req.body.decalNumber;
 var county = req.body.county;
 var titleApplication = req.body.titleApplication
 var stateTitleIn = req.body.stateTitleIn;
 var isTitleIn = req.body.isTitleIn;
var titleNumber = req.body.titleNumber;

//mileage,isExempt,locationCode,newOrUseOrRebuilt,isCertified,vin,year,transmission,transpeed,driveTrain,make,model,style,bodyType,exteriorColor,exteriorColorTwo,colorDescription,interiorColor,tag,decalNumber,county,titleApplication,stateTitleIn,isTitleIn,titleNumber,inspectionNumber,inspectionDate,inspectedBy,gpsSerialNumber,engineCylinders,engineSize,vehicleType,condition,weight,expirationDate,fuelType,mpgCombined,mpgCity,mpgHighway,ignitionKeyCode,doorKeyCode,valetKeyCode,isInspected,
//isDuplicateKeys,purchaseDate,originalCost,buyersFee,lotFee,addedCosts,floorPlanCost,totalCosts,vehicleSource,buyer,notes,isDraft,draftNumber,datePaid



var inspectionNumber = req.body.inspectionNumber;
var inspectionDate = req.body.inspectionDate;
 var inspectedBy = req.body.inspectedBy;
 var gpsSerialNumber = req.body.gpsSerialNumber;
 var engineCylinders = req.body.engineCylinders;
 var engineSize = req.body.engineSize;
 var vehType = req.body.vehType;
 var vehCondition = req.body.vehCondition;
 var vehWeight = req.body.vehWeight;
 var expirationDate = req.body.expirationDate;
 var fuelType = req.body.fuelType;
 var mpgCombined = req.body.mpgCombined;
 var mpgCity = req.body.mpgCity;
var mpgHighway = req.body.mpgHighway;

var ignitionKeyCode = req.body.ignitionKeyCode;
var doorKeyCode = req.body.doorKeyCode;
var valetKeyCode = req.body.valetKeyCode;
var isInspected = req.body.isInspected;
var isDuplicateKeys = req.body.isDuplicateKeys;
var purchaseDate = req.body.purchaseDate;
var originalCost = req.body.originalCost;
var buyersFee = req.body.buyersFee;
var lotFee = req.body.lotFee;
var addedCosts = req.body.addedCosts;
var floorPlanCost = req.body.floorPlanCost;
var totalCosts = req.body.totalCosts;
var howDidYouPay = req.body.howDidYouPay;
var vehicleSource = req.body.vehicleSource;
var vendorId = req.body.vendorId;
var buyer = req.body.buyer;
var notes = req.body.notes;
var isDraft = req.body.isDraft;
var draftNumber = req.body.draftNumber;
var datePaid = req.body.datePaid;




var sql =`INSERT INTO addingVehicle_GeneralFourteen (mileage,isExempt,locationCode,mileageIs,newOrUseOrRebuilt,isCertified,vin,year,transmission,transpeed,driveTrain,make,model,style,bodyType,exteriorColor,exteriorColorTwo,colorDescription,interiorColor,tag,decalNumber,county,titleApplication,stateTitleIn,isTitleIn,titleNumber,inspectionNumber,inspectionDate,inspectedBy,gpsSerialNumber,engineCylinders,engineSize,vehType,vehCondition,vehWeight,expirationDate,fuelType,mpgCombined,mpgCity,mpgHighway,ignitionKeyCode,doorKeyCode,valetKeyCode,
  isInspected,isDuplicateKeys,purchaseDate,originalCost,buyersFee,lotFee,addedCosts,floorPlanCost,totalCosts,howDidYouPay,vehicleSource,vendorId,buyer,notes,isDraft,draftNumber,datePaid) VALUES("${mileage}", "${isExempt}", "${locationCode}","${mileageIs}", "${newOrUseOrRebuilt}", "${isCertified}", "${vin}", "${year}", "${transmission}", "${transpeed}", "${driveTrain}","${make}", "${model}", "${style}", "${bodyType}", "${exteriorColor}", "${exteriorColorTwo}", "${colorDescription}", "${interiorColor}", "${tag}", "${decalNumber}", "${county}", "${titleApplication}", "${stateTitleIn}", "${isTitleIn}","${titleNumber}",  "${inspectionNumber}",  "${inspectionDate}", "${inspectedBy}", "${gpsSerialNumber}", "${engineCylinders}", "${engineSize}", "${vehType}", "${vehCondition}", "${vehWeight}", "${expirationDate}", "${fuelType}", "${mpgCombined}", "${mpgCity}", "${mpgHighway}","${ignitionKeyCode}", "${doorKeyCode}", "${valetKeyCode}", "${isInspected}", "${isDuplicateKeys}", "${purchaseDate}", "${originalCost}", "${buyersFee}", "${lotFee}", "${addedCosts}", "${floorPlanCost}", "${totalCosts}", "${howDidYouPay}", "${vehicleSource}", "${vendorId}", "${buyer}", "${notes}", "${isDraft}", "${draftNumber}", "${datePaid}")`;
  console.log(req.body);
  console.log("Query :" + sql );
  dbConn.query(sql, function(err, results, fields) {

  console.log(JSON.stringify(results));
if(err) {
  //   stockId = result.insertId;
     req.flash("errorMessage", ` Account not created!`);
     res.locals.messageError = req.flash();
//   res.status(500).send({ error: 'Something failed!',stockId: result.insertId})

 }
 else{
  //  stockId = result.insertId;
   req.flash("successMessage", `account created successfully!`);
   res.locals.messageSuccess = req.flash();

   res.render('vendor/addingVendor_General', {
       title: 'Form for addingVendor_General'
     })
 }
// res.json({'status': 'success', id: result.insertId,stockId: result.insertId})



res.end(JSON.stringify(results));
//  res.json({'status': 'success', id: result.insertId,stockId: result.insertId})
//  stockId = result.insertId;
});






})


app.post('/createAddingVehicleGeneralFourteen', function(req, res, next) {

  var mileage = req.body.mileage;
  var isExempt = req.body.isExempt;
  var locationCode = req.body.locationCode;
  var mileageIs = req.body.mileageIs;
   var newOrUseOrRebuilt = req.body.newOrUseOrRebuilt;
   var isCertified = req.body.isCertified;
   var vin = req.body.vin;

   var year = req.body.year;
   var transmission = req.body.transmission;
   var transpeed = req.body.transpeed;
  var driveTrain = req.body.driveTrain;

  var make = req.body.make;
   var model = req.body.model;
   var style = req.body.style;
  var  bodyType = req.body.bodyType;
  var  exteriorColor = req.body.exteriorColor;
  var  exteriorColorTwo = req.body.exteriorColorTwo;
  var  colorDescription = req.body.colorDescription;
   var interiorColor = req.body.interiorColor;
  var  tag = req.body.tag;
   var decalNumber = req.body.decalNumber;
   var county = req.body.county;
   var titleApplication = req.body.titleApplication
   var stateTitleIn = req.body.stateTitleIn;
   var isTitleIn = req.body.isTitleIn;
  var titleNumber = req.body.titleNumber;

  //mileage,isExempt,locationCode,newOrUseOrRebuilt,isCertified,vin,year,transmission,transpeed,driveTrain,make,model,style,bodyType,exteriorColor,exteriorColorTwo,colorDescription,interiorColor,tag,decalNumber,county,titleApplication,stateTitleIn,isTitleIn,titleNumber,inspectionNumber,inspectionDate,inspectedBy,gpsSerialNumber,engineCylinders,engineSize,vehicleType,condition,weight,expirationDate,fuelType,mpgCombined,mpgCity,mpgHighway,ignitionKeyCode,doorKeyCode,valetKeyCode,isInspected,
  //isDuplicateKeys,purchaseDate,originalCost,buyersFee,lotFee,addedCosts,floorPlanCost,totalCosts,vehicleSource,buyer,notes,isDraft,draftNumber,datePaid



  var inspectionNumber = req.body.inspectionNumber;
  var inspectionDate = req.body.inspectionDate;
   var inspectedBy = req.body.inspectedBy;
   var gpsSerialNumber = req.body.gpsSerialNumber;
   var engineCylinders = req.body.engineCylinders;
   var engineSize = req.body.engineSize;
   var vehType = req.body.vehType;
   var vehCondition = req.body.vehCondition;
   var vehWeight = req.body.vehWeight;
   var expirationDate = req.body.expirationDate;
   var fuelType = req.body.fuelType;
   var mpgCombined = req.body.mpgCombined;
   var mpgCity = req.body.mpgCity;
  var mpgHighway = req.body.mpgHighway;

  var ignitionKeyCode = req.body.ignitionKeyCode;
  var doorKeyCode = req.body.doorKeyCode;
  var valetKeyCode = req.body.valetKeyCode;
  var isInspected = req.body.isInspected;
  var isDuplicateKeys = req.body.isDuplicateKeys;
  var purchaseDate = req.body.purchaseDate;
  var originalCost = req.body.originalCost;
  var buyersFee = req.body.buyersFee;
  var lotFee = req.body.lotFee;
  var addedCosts = req.body.addedCosts;
  var floorPlanCost = req.body.floorPlanCost;
  var totalCosts = req.body.totalCosts;
  var howDidYouPay = req.body.howDidYouPay;
  var vehicleSource = req.body.vehicleSource;
  var vendorId = req.body.vendorId;
  var buyer = req.body.buyer;
  var notes = req.body.notes;
  var isDraft = req.body.isDraft;
  var draftNumber = req.body.draftNumber;
  var datePaid = req.body.datePaid;




  var sql =`INSERT INTO addingVehicle_GeneralFourteen (mileage,isExempt,locationCode,mileageIs,newOrUseOrRebuilt,isCertified,vin,year,transmission,transpeed,driveTrain,make,model,style,bodyType,exteriorColor,exteriorColorTwo,colorDescription,interiorColor,tag,decalNumber,county,titleApplication,stateTitleIn,isTitleIn,titleNumber,inspectionNumber,inspectionDate,inspectedBy,gpsSerialNumber,engineCylinders,engineSize,vehType,vehCondition,vehWeight,expirationDate,fuelType,mpgCombined,mpgCity,mpgHighway,ignitionKeyCode,doorKeyCode,valetKeyCode,isInspected,isDuplicateKeys,purchaseDate,originalCost,buyersFee,lotFee,addedCosts,floorPlanCost,totalCosts,howDidYouPay,vehicleSource,vendorId,buyer,notes,isDraft,draftNumber,datePaid) VALUES ("${mileage}", "${isExempt}", "${locationCode}","${mileageIs}", "${newOrUseOrRebuilt}", "${isCertified}", "${vin}", "${year}", "${transmission}", "${transpeed}", "${driveTrain}","${make}", "${model}", "${style}", "${bodyType}", "${exteriorColor}", "${exteriorColorTwo}", "${colorDescription}", "${interiorColor}", "${tag}", "${decalNumber}", "${county}", "${titleApplication}", "${stateTitleIn}", "${isTitleIn}","${titleNumber}",  "${inspectionNumber}",  "${inspectionDate}", "${inspectedBy}", "${gpsSerialNumber}", "${engineCylinders}", "${engineSize}", "${vehType}", "${vehCondition}", "${vehWeight}", "${expirationDate}", "${fuelType}", "${mpgCombined}", "${mpgCity}", "${mpgHighway}","${ignitionKeyCode}", "${doorKeyCode}", "${valetKeyCode}", "${isInspected}", "${isDuplicateKeys}", "${purchaseDate}", "${originalCost}", "${buyersFee}", "${lotFee}", "${addedCosts}", "${floorPlanCost}", "${totalCosts}", "${howDidYouPay}", "${vehicleSource}", "${vendorId}", "${buyer}", "${notes}", "${isDraft}", "${draftNumber}", "${datePaid}")`;
    dbConn.query(sql, function(err, result) {

      console.log(req.body);
      console.log("Query :" + sql );
      console.log(JSON.stringify(result));
  if(err) {
  //     stockId = result.insertId;
  //   res.status(500).send({ error: 'Something failed!',stockId: result.insertId})

   }
   else{

     req.flash("successMessage", `Vehicle created successfully!`);
     res.locals.messageSuccess = req.flash();
     res.render('vendor/addingVehicle_General', {
         title: 'Form for addingVehicle_General'
     })
   }
  // res.json({'status': 'success', id: result.insertId,stockId: result.insertId})



//  res.end(JSON.stringify(results));
//  res.json({'status': 'success', id: result.insertId,stockId: result.insertId})
//  stockId = result.insertId;
})


})


app.post('/createAddingVehicleGeneralFifteen', function(req, res, next) {

  var mileage = req.body.mileage;
  var isExempt = req.body.isExempt;
  var locationCode = req.body.locationCode;
  var mileageIs = req.body.mileageIs;
   var newOrUseOrRebuilt = req.body.newOrUseOrRebuilt;
   var isCertified = req.body.isCertified;
   var vin = req.body.vin;

   var year = req.body.year;
   var transmission = req.body.transmission;


  var make = req.body.make;
   var model = req.body.model;
   var style = req.body.style;
  var  bodyType = req.body.bodyType;
  var  exteriorColor = req.body.exteriorColor;
  var  exteriorColorTwo = req.body.exteriorColorTwo;
  var  colorDescription = req.body.colorDescription;
   var interiorColor = req.body.interiorColor;
  var  tag = req.body.tag;
   var decalNumber = req.body.decalNumber;
   var county = req.body.county;
   var titleApplication = req.body.titleApplication
   var stateTitleIn = req.body.stateTitleIn;
   var isTitleIn = req.body.isTitleIn;
  var titleNumber = req.body.titleNumber;

  //mileage,isExempt,locationCode,newOrUseOrRebuilt,isCertified,vin,year,transmission,transpeed,driveTrain,make,model,style,bodyType,exteriorColor,exteriorColorTwo,colorDescription,interiorColor,tag,decalNumber,county,titleApplication,stateTitleIn,isTitleIn,titleNumber,inspectionNumber,inspectionDate,inspectedBy,gpsSerialNumber,engineCylinders,engineSize,vehicleType,condition,weight,expirationDate,fuelType,mpgCombined,mpgCity,mpgHighway,ignitionKeyCode,doorKeyCode,valetKeyCode,isInspected,
  //isDuplicateKeys,purchaseDate,originalCost,buyersFee,lotFee,addedCosts,floorPlanCost,totalCosts,vehicleSource,buyer,notes,isDraft,draftNumber,datePaid



  var inspectionNumber = req.body.inspectionNumber;
  var inspectionDate = req.body.inspectionDate;
  var isInspected = req.body.isInspected;
  var isDuplicateKeys = req.body.isDuplicateKeys;
   var inspectedBy = req.body.inspectedBy;
   var gpsSerialNumber = req.body.gpsSerialNumber;




  var sql =`INSERT INTO addingVehicle_GeneralFifteen (mileage,isExempt,locationCode,mileageIs,newOrUseOrRebuilt,isCertified,vin,year,transmission,make,model,style,bodyType,exteriorColor,exteriorColorTwo,colorDescription,interiorColor,tag,decalNumber,county,titleApplication,stateTitleIn,isTitleIn,titleNumber,inspectionNumber,inspectionDate,isInspected,isDuplicateKeys,inspectedBy,gpsSerialNumber) VALUES("${mileage}", "${isExempt}", "${locationCode}","${mileageIs}", "${newOrUseOrRebuilt}", "${isCertified}", "${vin}", "${year}", "${transmission}","${make}", "${model}", "${style}", "${bodyType}", "${exteriorColor}", "${exteriorColorTwo}", "${colorDescription}", "${interiorColor}", "${tag}", "${decalNumber}", "${county}", "${titleApplication}", "${stateTitleIn}", "${isTitleIn}","${titleNumber}",  "${inspectionNumber}",  "${inspectionDate}","${isInspected}", "${isDuplicateKeys}", "${inspectedBy}", "${gpsSerialNumber}")`;
    dbConn.query(sql, function(err, result) {

            console.log(req.body);
            console.log("Query :" + sql );
  console.log(JSON.stringify(result));
  if(err) {
    //   stockId = result.insertId;
    // res.status(500).send({ error: 'Something failed!',stockId: result.insertId})
   }
  // res.json({'status': 'success', id: result.insertId,stockId: result.insertId})
  res.render('vendor/addingVendor_General', {
      title: 'Form for addingVendor_General'
    })


//  res.end(JSON.stringify(results));
//  res.json({'status': 'success', id: result.insertId,stockId: result.insertId})
//  stockId = result.insertId;
})


})


app.post('/createAddingVehicleGeneralSixteen', function(req, res, next) {
  var transpeed = req.body.transpeed;
  var driveTrain = req.body.driveTrain;
  var engineCylinders = req.body.engineCylinders;
  var engineSize = req.body.engineSize;
  var vehType = req.body.vehType;
  var vehCondition = req.body.vehCondition;
  var vehWeight = req.body.vehWeight;
  var expirationDate = req.body.expirationDate;
  var fuelType = req.body.fuelType;
  var mpgCombined = req.body.mpgCombined;
  var mpgCity = req.body.mpgCity;
 var mpgHighway = req.body.mpgHighway;

 var ignitionKeyCode = req.body.ignitionKeyCode;
 var doorKeyCode = req.body.doorKeyCode;
 var valetKeyCode = req.body.valetKeyCode;
 var isInspected = req.body.isInspected;
 var isDuplicateKeys = req.body.isDuplicateKeys;
 var purchaseDate = req.body.purchaseDate;
 var originalCost = req.body.originalCost;
 var buyersFee = req.body.buyersFee;
 var lotFee = req.body.lotFee;
 var addedCosts = req.body.addedCosts;
 var floorPlanCost = req.body.floorPlanCost;
 var totalCosts = req.body.totalCosts;
 var howDidYouPay = req.body.howDidYouPay;
 var vehicleSource = req.body.vehicleSource;
 var vendorId = req.body.vendorId;
 var buyer = req.body.buyer;
 var notes = req.body.notes;
 var isDraft = req.body.isDraft;
 var draftNumber = req.body.draftNumber;
 var datePaid = req.body.datePaid;


 var sql =`INSERT INTO addingVehicle_GeneralSixteen (transpeed,driveTrain,engineCylinders,engineSize,vehType,vehCondition,vehWeight,expirationDate,fuelType,mpgCombined,mpgCity,mpgHighway,ignitionKeyCode,doorKeyCode,valetKeyCode,purchaseDate,originalCost,buyersFee,lotFee,addedCosts,floorPlanCost,totalCosts,howDidYouPay,vehicleSource,vendorId,buyer,notes,isDraft,draftNumber,datePaid) VALUES( "${transpeed}", "${driveTrain}", "${engineCylinders}", "${engineSize}", "${vehType}", "${vehCondition}", "${vehWeight}", "${expirationDate}", "${fuelType}", "${mpgCombined}", "${mpgCity}", "${mpgHighway}","${ignitionKeyCode}", "${doorKeyCode}", "${valetKeyCode}", "${purchaseDate}", "${originalCost}", "${buyersFee}", "${lotFee}", "${addedCosts}", "${floorPlanCost}", "${totalCosts}", "${howDidYouPay}", "${vehicleSource}", "${vendorId}", "${buyer}", "${notes}", "${isDraft}", "${draftNumber}", "${datePaid}")`;


    dbConn.query(sql, function(err, result) {
      console.log(req.body);
      console.log("Query :" + sql );
console.log(JSON.stringify(result));

  if(err) {
    //   stockId = result.insertId;
  //   res.status(500).send({ error: 'Something failed!',stockId: result.insertId})
   }
   res.render('vendor/addingVendor_General', {
       title: 'Form for addingVendor_General'
     })
//   res.json({'status': 'success', id: result.insertId,stockId: result.insertId})



//  res.end(JSON.stringify(results));
//  res.json({'status': 'success', id: result.insertId,stockId: result.insertId})
//  stockId = result.insertId;
})


})















// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});

module.exports = app;
