---
description: how to upload the project to GitHub/Git
---

Follow these steps to upload your project to a new Git repository (e.g., GitHub):

1. **Initialize Git**  
   Open your terminal in the project directory and run:
   ```powershell
   git init
   ```

2. **Add Files**  
   Stage all your files for the first commit:
   ```powershell
   git add .
   ```

3. **Create First Commit**  
   ```powershell
   git commit -m "Initial commit: Istanbul Church 3D Virtual Museum"
   ```

4. **Connect to Remote (GitHub)**  
   Create a new repository on GitHub. Then, copy the URL and run:
   ```powershell
   git remote add origin YOUR_REPOSITORY_URL
   ```

5. **Set Branch Name**  
   ```powershell
   git branch -M main
   ```

6. **Push to GitHub**  
   ```powershell
   git push -u origin main
   ```
