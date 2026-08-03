// cPanel / Passenger startup shim.
//
// cPanel's "Setup Node.js App" needs a startup file at the application root,
// but the real server lives in .next/standalone/server.js (produced by
// `npm run build:cpanel`). This one line boots it. Passenger sets PORT; the
// standalone server reads it automatically.
require("./.next/standalone/server.js");
