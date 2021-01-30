import "regenerator-runtime/runtime"; 

import loginUser from "./user/loginUser";

$("body").prepend(loginUser());

// only need to show login form when login UI loads

