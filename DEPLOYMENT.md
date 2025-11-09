# New Philadelphia Municipal Data System (MDS) Deployment Guide

This guide walks a first-time deployer through publishing the MDS client so it is
available alongside **cityofnp.com** and configured to use AWS for document
storage.

---

## 1. Gather what you need

1. **A computer with a modern web browser.**
2. **An internet connection.**
3. **Access to the `cityofnp.com` web hosting account.** This could be a
   control panel login (such as cPanel, Plesk, or WordPress hosting) *or* FTP/SFTP
   credentials that let you upload files to the site.
4. **An AWS account** with permission to create an S3 bucket. If the City does not
   yet have a municipal AWS organization, coordinate with IT before proceeding.
5. **The MDS project files.** Either clone the repository with Git or download the
   ZIP archive from your source control platform.

> 💡 *If you download a ZIP, right-click the file and choose "Extract All" to
> create a regular folder containing `index.html`, `app.js`, `styles.css`, and this
> `DEPLOYMENT.md` file.*

---

## 2. Prepare an AWS S3 bucket for document storage

The web client references an AWS S3 bucket where uploaded documents live.
Follow these steps once to create and configure it:

1. Sign in to the [AWS Management Console](https://console.aws.amazon.com/).
2. Open **S3** from the Services menu.
3. Click **Create bucket**.
4. Enter a unique bucket name (for example `cityofnp-mds-documents`). Write this
   exact name down—you will reference it later.
5. Choose the AWS Region closest to New Philadelphia (for example `us-east-2`).
6. Leave the remaining defaults and click **Create bucket** at the bottom.
7. After creation, open the bucket and click the **Properties** tab.
8. Scroll to **Static website hosting** and choose **Enable** so that the bucket
   can surface document links. Set the index document to `index.html` even though
   the client itself is hosted elsewhere; this satisfies AWS validation.
9. Switch to the **Permissions** tab and review the public access settings.
   - Keep **Block all public access** enabled if documents should only be
     retrieved by logged-in staff through signed URLs.
   - Disable the block if the City intends to allow public downloads directly
     (for example, for passed legislation). Coordinate with IT for the proper
     policy before changing this setting.
10. Optional: create folder prefixes for `applications/`, `forms/`,
    `judicial/`, and `legislation/` to match the sample data already used in
    `app.js`.

---

## 3. Update the application to reference your bucket

1. Open `app.js` in any text editor (Notepad, TextEdit, VS Code, etc.).
2. Use the Find feature (Ctrl+F or Cmd+F) to search for `mds-city-storage`.
3. Replace every occurrence with the bucket name you created in step 2 (for
   example `cityofnp-mds-documents`).
4. Save the file.

The client now points to your actual AWS bucket for generated upload links.

---

## 4. Embed the live Google Docs used by the City

1. Still in `app.js`, search for `docs.google.com`.
2. Replace the sample URLs with the real Google Docs or Google Sheets sharing
   links for:
   - The municipal charter.
   - The citizen ID registry.
3. Ensure each Google document is set to **Anyone with the link can view** so the
   embedded version can display for authorized users and the public portal.
4. Save the changes.

---

## 5. Publish the web client to cityofnp.com

The MDS interface is a static website (HTML, CSS, and JavaScript). You only need
to upload three files to make it live.

### Option A – Upload through a hosting control panel

1. Log in to the `cityofnp.com` control panel provided by your hosting company.
2. Open the **File Manager** or equivalent tool.
3. Navigate to the folder where you want the app to live (for example,
   `/public_html/mds`).
4. Use the **Upload** button to send the following files from your local folder:
   - `index.html`
   - `styles.css`
   - `app.js`
5. If the folder already contained older versions, allow the upload tool to
   overwrite them.
6. Visit `https://cityofnp.com/mds` (or the path you chose) in your browser to
   confirm the interface loads.

### Option B – Upload with FTP/SFTP

1. Open your FTP client (FileZilla is free and beginner-friendly).
2. Enter the host (e.g., `ftp.cityofnp.com`), username, password, and port from
   your hosting provider.
3. Connect and browse to the destination folder (again, `/public_html/mds` is a
   common choice).
4. Drag `index.html`, `styles.css`, and `app.js` from your computer’s folder into
   the remote folder.
5. After the transfer completes, visit the matching URL in a browser to verify
   everything loads correctly.

> ✅ If the page loads but looks unstyled, double-check that `styles.css` is in the
> same folder as `index.html`. If interactive features do not work, confirm that
> `app.js` is present and not renamed.

---

## 6. Set up a link from the main city website

1. Log in to the content management system (CMS) for `cityofnp.com`.
2. Edit the navigation menu or the page where you want to advertise the MDS.
3. Add a new link titled “Municipal Data System (MDS)” that points to the URL
   where you uploaded the files (e.g., `https://cityofnp.com/mds`).
4. Save and publish the update.

---

## 7. Test the deployment

1. Open the MDS URL in a private/incognito browser window.
2. Confirm that:
   - The public portal loads and displays charter, legislation, jurisprudence,
     and poll data.
   - Clicking **Employee sign-in** shows the login screen.
   - The footer and header links point to `cityofnp.com`.
3. Log in using one of the seeded accounts from the onboarding packet or by
   creating a test user through the CComm admin portal.
4. Test an AWS upload by filling in the upload form. The app will show the S3 key
   it plans to use; verify it matches your bucket naming.

---

## 8. Ongoing maintenance checklist

- **Back up your files.** Keep a copy of the three web files and this guide in a
  secure location.
- **Rotate seeded passwords.** Use the admin portal to change passwords after the
  first login.
- **Review S3 bucket usage monthly.** Archive or delete outdated uploads per the
  City’s records retention policy.
- **Keep Google Docs current.** Because the charter and citizen registry are live
  documents, continue managing them directly in Google Docs.
- **Plan for enhancements.** As workflows evolve, update `app.js` data seeds and
  navigation labels so the interface reflects current municipal terminology.

You have now successfully deployed the New Philadelphia Municipal Data System!
