'use server';

import { Document, Category } from '../types';
import { listSharedFolders, listFilesInFolder, getFileContent, getDriveClient } from '../../lib/google-drive';

interface MockDoc extends Document {
  category: Category;
}

const MOCK_REPOSITORY: MockDoc[] = [
  // --- Service Management Documents ---
  {
    category: 'Service Management',
    name: "ITSM_Change_Management_Policy_v2.4.pdf",
    content: `
# Global Change Management Policy

## 1. Introduction
This policy outlines the standard procedures for managing changes to the production IT environment. The goal is to minimize risk and impact while facilitating necessary updates.

## 2. Filing a Change Request (RFC)
To initiate a change, you must file a Request for Change (RFC) through the Service Management Portal.

### Required Information:
*   **Summary**: A brief title for the change.
*   **Description**: Detailed explanation of what is changing.
*   **Justification**: Why is this change needed now?
*   **Risk Assessment**: Low, Medium, or High based on the impact matrix.
*   **Implementation Plan**: Step-by-step guide for executing the change.
*   **Backout Plan**: Steps to revert the change if it fails.

## 3. Change Types & SLAs
*   **Standard Change**: Pre-approved low-risk changes (e.g., OS patching). SLA: 24 hours notice.
*   **Normal Change**: Requires peer review and Manager approval. SLA: 3 business days notice.
*   **Emergency Change**: For critical incident resolution only. Requires ECAB (Emergency Change Advisory Board) verbal approval. Can be filed retroactively.

## 4. Maintenance Windows
Regular maintenance windows are scheduled every Sunday from 02:00 UTC to 06:00 UTC. Changes outside this window require VP-level approval.
`
  },
  {
    category: 'Service Management',
    name: "Incident_Response_Guide_2024.docx",
    content: `
# Incident Management & Response Guide

## Severity Definitions
*   **SEV-1 (Critical)**: System Down / Business Halted.
    *   **SLA**: Response < 15m, Resolution < 4h.
    *   **Action**: Page the On-Call Engineer and Incident Commander immediately.
*   **SEV-2 (High)**: Major feature broken / Performance degraded.
    *   **SLA**: Response < 30m, Resolution < 8h.
*   **SEV-3 (Medium)**: Minor bug / Workaround available.
    *   **SLA**: Response < 4h, Resolution < 3 days.

## The Incident Lifecycle
1.  **Identification**: Alert received via monitoring or user report.
2.  **Logging**: Create a ticket in the Service Desk tool.
3.  **Categorization**: Assign correct Priority and Category.
4.  **Investigation**: Diagnose root cause.
5.  **Resolution**: Apply fix or workaround.
6.  **Closure**: Confirm with user and close ticket.

## Escalation
If a SEV-1 incident is not resolved within 1 hour, it must be escalated to the Duty Manager.
`
  },
  // --- IT Service Desk Documents ---
  {
    category: 'IT Service Desk',
    name: "Knowledge_Base_VPN_Setup.md",
    content: `
# How to Connect to Corporate VPN

## Prerequisites
*   A company-issued laptop.
*   The "SecureCorp VPN" client installed (check your Start Menu).
*   Active MFA (Multi-Factor Authentication) set up on your mobile device.

## Connection Steps
1.  Open **SecureCorp VPN**.
2.  In the "Server Address" field, enter: \`vpn.global.company.com\`
3.  Click **Connect**.
4.  Enter your standard network username and password.
5.  When prompted, approve the push notification on your Authenticator app.
6.  Once the icon turns green, you are connected.

## Troubleshooting
*   **Error 619**: Usually means your password has expired. Reset it at identity.company.com.
*   **Connection Drops**: Try switching from Wi-Fi to a wired connection if possible.
`
  },
  {
    category: 'IT Service Desk',
    name: "Printer_Configuration_Guide.pdf",
    content: `
# Adding a Network Printer (Windows 11)

1.  Open **Settings** > **Bluetooth & devices** > **Printers & scanners**.
2.  Click **Add device**.
3.  Wait for the list to populate.
    *   If you see your printer (e.g., "HQ-Floor2-Color"), click **Add device**.
4.  **If the printer isn't listed**:
    *   Click "The printer that I want isn't listed".
    *   Select "Select a shared printer by name".
    *   Type: \`\\\\printserver01\\<printer-name>\` (e.g., \`\\\\printserver01\\HQ-Floor2-Color\`).
    *   Click Next to install drivers.

## Common Printer Names
*   HQ-Floor1-BW
*   HQ-Floor2-Color
*   HQ-Floor3-Marketing
`
  },
  {
    category: 'IT Service Desk',
    name: "Password_Reset_Procedures.txt",
    content: `
# Self-Service Password Reset (SSPR)

You can reset your domain password without calling the Help Desk if you have registered for SSPR.

## Steps:
1.  Go to **https://passwordreset.company.com** on any device (including mobile).
2.  Click "I forgot my password".
3.  Enter your email address and complete the CAPTCHA.
4.  Select a verification method (SMS, Alternate Email, or Authenticator App).
5.  Enter the code you received.
6.  Type your new password twice.

## Requirements
*   Minimum 12 characters.
*   Must contain uppercase, lowercase, number, and special character.
*   Cannot be one of your last 5 passwords.
`
  },
  // --- HR Documents ---
  {
    category: 'HR Policies',
    name: "Remote_Work_Policy.pdf",
    content: `
# Flexible Work Arrangement Policy

## Eligibility
All full-time employees are eligible for hybrid remote work after their 90-day probationary period, subject to manager approval.

## Core Hours
Employees must be available for meetings during core hours: 10:00 AM to 3:00 PM local time.

## Equipment Stipend
A one-time stipend of $500 is available for home office equipment (monitor, chair, desk). Submit expenses via Concur with code "REMOTE-24".
`
  }
];

export const fetchDriveDocuments = async (category: string): Promise<Document[]> => {
  if (category === 'HR Policies') {
    try {
      console.log('Fetching HR Policies from Google Drive...');
      const folders = await listSharedFolders();
      const hrFolder = folders.find(f => f.name === 'HR_FILES');

      if (hrFolder && hrFolder.id) {
        const files = await listFilesInFolder(hrFolder.id);

        // Parallel fetch all file contents
        const documentPromises = files
          .filter(file => file.id && file.mimeType && (
            file.mimeType === 'application/vnd.google-apps.document' ||
            file.mimeType === 'application/pdf' ||
            file.mimeType.startsWith('text/')
          ))
          .map(async (file) => {
            try {
              const content = await getFileContent(file.id!, file.mimeType!);
              return {
                name: file.name || 'Untitled',
                content: typeof content === 'string' ? content : JSON.stringify(content),
              };
            } catch (err) {
              console.error(`Failed to fetch content for ${file.name} (ID: ${file.id}, Type: ${file.mimeType})`, err);
              return null;
            }
          });

        const results = await Promise.all(documentPromises);
        const documents = results.filter((doc): doc is Document => doc !== null);

        console.log(`Returning ${documents.length} documents from Drive:`, documents.map(d => d.name));
        return documents;
      } else {
        throw new Error("HR_FILES folder not found in Google Drive.");
      }
    } catch (error) {
      console.error('Error fetching from Drive:', error);
      throw error; // Re-throw to prevent fallback to mock data
    }
  }

  if (category === 'IT Service Desk') {
    try {
      console.log('Fetching IT Service Desk documents from Google Drive...');

      let sdFolderId = process.env.SERVICE_DESK_FOLDER_ID;
      console.log(`[DEBUG] SERVICE_DESK_FOLDER_ID env var: ${sdFolderId}`);

      // If no ID provided, try to find by name (fallback/backward compatibility)
      if (!sdFolderId) {
        console.log('[DEBUG] No ID found in env, searching by name...');
        const drive = getDriveClient();
        const res = await drive.files.list({
          q: "mimeType = 'application/vnd.google-apps.folder' and name = 'Service_Desk' and trashed = false",
          fields: 'files(id, name)',
        });
        const sdFolder = res.data.files?.[0];
        console.log(`[DEBUG] Search by name found:`, sdFolder);
        sdFolderId = sdFolder?.id || undefined;
      }

      if (sdFolderId) {
        // Function to process a folder and return documents (with parallel fetching)
        const processFolder = async (folderId: string): Promise<Document[]> => {
          const files = await listFilesInFolder(folderId);

          // Separate folders from documents
          const subfolders = files.filter(f => f.id && f.mimeType === 'application/vnd.google-apps.folder');
          const documentFiles = files.filter(f => f.id && f.mimeType && (
            f.mimeType === 'application/vnd.google-apps.document' ||
            f.mimeType === 'application/pdf' ||
            f.mimeType.startsWith('text/')
          ));

          // Parallel fetch: process subfolders and documents concurrently
          const subfolderPromises = subfolders.map(async (folder) => {
            try {
              return await processFolder(folder.id!);
            } catch (err) {
              console.error(`Failed to process subfolder ${folder.name} (${folder.id})`, err);
              return [];
            }
          });

          const documentPromises = documentFiles.map(async (file) => {
            try {
              const content = await getFileContent(file.id!, file.mimeType!);
              return {
                name: file.name || 'Untitled',
                content: typeof content === 'string' ? content : JSON.stringify(content),
              };
            } catch (err) {
              console.error(`Failed to fetch content for ${file.name} (ID: ${file.id}, Type: ${file.mimeType})`, err);
              return null;
            }
          });

          // Wait for all operations in parallel
          const [subfolderResults, documentResults] = await Promise.all([
            Promise.all(subfolderPromises),
            Promise.all(documentPromises),
          ]);

          // Flatten subfolder results and filter out failed documents
          const subfolderDocs = subfolderResults.flat();
          const folderDocs = documentResults.filter((doc): doc is Document => doc !== null);

          return [...folderDocs, ...subfolderDocs];
        };

        const documents = await processFolder(sdFolderId);

        console.log(`Returning ${documents.length} documents from Drive:`, documents.map(d => d.name));
        return documents;
      } else {
        throw new Error("Service_Desk folder not found in Google Drive.");
      }
    } catch (error) {
      console.error('Error fetching from Drive:', error);
      throw error;
    }
  }

  // Fallback / Default behavior for other categories
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredDocs = MOCK_REPOSITORY.filter(doc => doc.category === category);
      resolve(filteredDocs.map(({ name, content }) => ({ name, content })));
    }, 800);
  });
};
