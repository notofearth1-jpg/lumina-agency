# Native Apps Build Instructions

The React application source code is located in `../app_mockups`.

To build the application and populate this `apps` directory with the production files, run the following commands from the `agency` root directory:

```bash
cd app_mockups
npm install
npm run build
```

This will compile the React mockups and output the static files to this `apps` directory, making them accessible at `/apps/` on the live site.
