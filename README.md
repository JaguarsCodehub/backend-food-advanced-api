# Advanced Backend API

### Features 👇

1. Typescript config and Database Connection.
2. MVC Type folder structure: Models, Controllers, Services, Utility, Middleware and Routes.
3. Route handling & protection
4. MongoDB Schema based approach.
5. Creating custom individual Type interfaces for various Server Requests.

   ```Typescript

   export interface createVendorInput {
   name: string;
   ownerName: string;
   foodType: string;
   pincode: string;
   address: string;
   phone: string;
   email: string;
   password: string;
   }

   req: Request<{}, {}, createVendorInput>
   ```

6. Hashing Passwords & comparing the salt attached with it.

   ```Typescript
   import bcrypt from 'bcrypt';

    export const generateSalt = async () => {
        return await bcrypt.genSalt();
    };


    export const generatedPassword = async (password: string, salt: string) => {
        return await bcrypt.hash(password, salt);
    };

    export const validatedPassword = async (
        enteredPassword: string,
        savedPassword: string,
        salt: string
    ) => {
        return (await generatedPassword(enteredPassword, salt)) === savedPassword;
    };
   ```

7. Admin GET & POST endpoints ✅
8. Vendor Login endpoint ✅
9. Shopping Route added.
10. Search Restaurants through various parameters like Pincode, Time etc
11. Added various parameters.
12. Migrated the index.ts expressApp to services/expressApp for clean code and file structure.
13. Added the food model and DTO for the same.
14. Added feature of adding images but didnt work (maybe an issue in Postman Config).
