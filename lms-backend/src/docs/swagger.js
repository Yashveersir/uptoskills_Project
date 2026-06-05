import swaggerJsdoc from "swagger-jsdoc";


const options = {
definition: {
openapi: "3.0.0",
info: {
title: "LMS API",
version: "1.0.0",
description: "Learning Management System API Documentation"
},


    servers: [
        {
            url: "http://localhost:5000"
        }
    ]
},

apis: ["./src/routes/*.js"]


};

const swaggerSpec = swaggerJsdoc(options);


export default swaggerSpec;
