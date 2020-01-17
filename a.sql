create database dbTestZeroB;

use dbTestZeroB;


CREATE TABLE `categoryTest` (
`id` int(11)  PRIMARY KEY NOT NULL AUTO_INCREMENT,
`categoryName` varchar(50) NOT NULL

)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO categoryTest(categoryName)
VALUES ('Buyers');



CREATE TABLE `vendorGeneralInformationC` (
`id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
`name` varchar(50) NOT NULL,
`isActive` BOOLEAN NOT NULL,
`street` varchar(80) NOT NULL,
`zip` varchar(20) NOT NULL,
`city` varchar(30) NOT NULL,
`state` varchar(30) NOT NULL,
`phone` varchar(20),
`phoneTwo` varchar(20),
`fax` varchar(20),
`contact` varchar(50),
`email` varchar(50) NOT NULL,
`categoryId` int(11) DEFAULT NULL,
`accountNumber` varchar(30),
`defaultGLAccount` varchar(30),
`nameToPrintOnCheckOr1099` varchar(50),
`mailingName` varchar(50),
`mailingStreet` varchar(80),
`mailingCityStateZip` varchar(80),
`socialSecurityNumber` varchar(20),
`isNon1099Vendor` BOOLEAN NOT NULL,
`notes` varchar(400),


FOREIGN KEY (`categoryId`) REFERENCES `categoryTest` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;




INSERT INTO vendorGeneralInformationC(name,isActive,street,zip,city,state,email,categoryId,isNon1099Vendor) VALUES
('Krishna',1,'JJ nagar','99','BANGORE','Maine','abcd@gmail.com',1,0);

INSERT INTO vendorGeneralInformationC(name,isActive,street,zip,city,state,email,categoryId,isNon1099Vendor) VALUES
('a',1,'JJ nagar','99','a','aa','aa@gmail.com',1,0);



CREATE TABLE `addingVehicle_GeneralFourteen` (
`stockNumber` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
`mileage` int(10) DEFAULT 0,
`isExempt` BOOLEAN DEFAULT 0,
`locationCode` varchar(50),
`mileageIs` varchar(50),
`newOrUseOrRebuilt` varchar(20),
`isCertified` BOOLEAN DEFAULT 1,
`vin` varchar(20),
`year` varchar(20),
`transmission` varchar(20),
`transpeed` varchar(20),
`driveTrain` varchar(20),
`make` varchar(20),
`model` varchar(20),
`style` varchar(20),
`bodyType` varchar(20),
`exteriorColor` varchar(20),
`exteriorColorTwo` varchar(20),
`colorDescription` varchar(20),
`interiorColor` varchar(20),
`tag` varchar(20),
`decalNumber` varchar(20),
`county` varchar(30),
`titleApplication` varchar(50),
`stateTitleIn` varchar(30),
`isTitleIn` BOOLEAN DEFAULT 0,
`titleNumber` varchar(50),
`inspectionNumber` varchar(50),
`inspectionDate` varchar(20),
`inspectedBy` varchar(50),
`gpsSerialNumber` varchar(50),
`engineCylinders` varchar(20),
`engineSize` varchar(20),
`vehType` varchar(20),
`vehCondition` varchar(20),
`vehWeight` varchar(20),
`expirationDate` varchar(20),
`fuelType` varchar(20),
`mpgCombined` varchar(20),
`mpgCity` varchar(20),
`mpgHighway` varchar(20),
`ignitionKeyCode` varchar(30),
`doorKeyCode` varchar(30),
`valetKeyCode` varchar(30),
`isInspected` BOOLEAN DEFAULT 0,
`isDuplicateKeys` BOOLEAN DEFAULT 1,
`purchaseDate` varchar(30),
`originalCost` DECIMAL(10,2) DEFAULT '0.00',
`buyersFee` DECIMAL(10,2) DEFAULT '0.00',
`lotFee` DECIMAL(10,2) DEFAULT '0.00',
`addedCosts` DECIMAL(10,2) DEFAULT '0.00',
`floorPlanCost` DECIMAL(10,2) DEFAULT '0.00',
`totalCosts` DECIMAL(10,2) DEFAULT '0.00',
`howDidYouPay` varchar(50),
`vehicleSource` varchar(50) DEFAULT 'Company',
`vendorId` int(11) DEFAULT NULL,
`buyer` varchar(50),
`notes` varchar(400),
`isDraft` BOOLEAN DEFAULT 1,
`draftNumber` varchar(50),
`datePaid` varchar(50),
FOREIGN KEY (`vendorId`) REFERENCES `vendorGeneralInformationC` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8;

insert into addingVehicle_GeneralFourteen(mileage,vendorId) values (1006,1);


  CREATE TABLE `addingVendor_BillHistoryB` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `stockNumberId` int(11) DEFAULT NULL,
  `vendorId` int(11) DEFAULT NULL,
  `isAddToBill` int(11) NOT NULL,
  `date` varchar(20) NOT NULL,
  `dateDue` varchar(20) NOT NULL,
  `datePaid` varchar(20),
  `amount` DECIMAL(10,2) NOT NULL,
  `invoice` varchar(50) NOT NULL,
  `status` varchar(50),
  `checkNumber` varchar(50),
  `isCleared` BOOLEAN DEFAULT 0,
  `checkMemo` varchar(200),
  FOREIGN KEY (`stockNumberId`) REFERENCES `addingVehicle_GeneralFourteen` (`stockNumber`) ON DELETE SET NULL ON UPDATE CASCADE,
   FOREIGN KEY (`vendorId`) REFERENCES `vendorGeneralInformationC` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
  )ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `addingVendor_addedCosts` (
`id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
`date` varchar(30),
`cost` DECIMAL(10,2) DEFAULT '0.00',
`vehicleId` int(11) DEFAULT NULL,
`description` varchar(400),
`ticket` varchar(50),
`gl` int(11) DEFAULT NULL,
`vendorId` int(11) DEFAULT NULL,
FOREIGN KEY (`vendorId`) REFERENCES `vendorGeneralInformationC` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (`vehicleId`) REFERENCES `addingVehicle_GeneralFourteen` (`stockNumber`) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `addingVendor_GLPostsOne` (
`id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,

`date` varchar(30),
`amount` int(11) NOT NULL,
`referenceOrCheckNumber` varchar(30),
`descriptionOne` varchar(400),
`vendorId` int(11) DEFAULT NULL,
FOREIGN KEY (`vendorId`) REFERENCES `vendorGeneralInformationC` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;




delimiter #
create trigger addingVehicle_GeneralTen_TriggerFour after insert on addingVehicle_GeneralFourteen
for each row
BEGIN
set @stNumber = (SELECT stockNumber FROM addingVehicle_GeneralFourteen ORDER BY stockNumber  DESC LIMIT 1);
insert into addingVendor_addedCosts(date,cost,vehicleId,description,ticket,gl,vendorId) VALUES (new.purchaseDate,new.addedCosts,@stNumber,'vehicle Added costs',uuid(),1,new.vendorId);
end#


delimiter #
create trigger addingVehicle_GeneralTen_TriggerFive after insert on addingVendor_addedCosts
for each row
BEGIN

set @sumAddedCosts = (select SUM(cost) FROM addingVendor_addedCosts where vendorId =new.vendorId);
INSERT INTO addingVendor_GLPostsOne(date,amount,referenceOrCheckNumber,descriptionOne,vendorId)
SELECT * FROM(SELECT new.date,@sumAddedCosts,'VALUE ADDED COSTS','Description',new.vendorId) AS tmp
WHERE NOT EXISTS (
    SELECT vendorId FROM addingVendor_GLPostsOne WHERE vendorId = new.vendorId
)LIMIT 1;

end#



delimiter #
create trigger addingVehicle_GeneralTen_TriggerSix after insert on addingVendor_addedCosts
for each row
BEGIN
set @sumAddedCosts = (select SUM(cost) FROM addingVendor_addedCosts where vendorId =new.vendorId);
update addingVendor_GLPostsOne SET date = new.date, amount = @sumAddedCosts, referenceOrCheckNumber = 'VALUE ADDED COSTS', descriptionOne = 'Description',vendorId =new.vendorId  where vendorId =new.vendorId;
end#


insert into addingVehicle_GeneralFourteen(mileage,addedCosts,vendorId) values (0,1000,1);
