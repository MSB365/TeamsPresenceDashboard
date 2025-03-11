# TeamsPresenceDashboard

# Portal Setup Guide

## Introduction
This guide will help you set up the Portal by creating an App Registration in Entra ID with the necessary Graph permissions.

## Prerequisites
Before you begin, ensure you have:
- An Entra ID account
- Admin access to create App Registrations

## Steps to Create App Registration

1. **Sign in to Entra ID**
   - Go to the Entra ID portal.
   - Sign in with your credentials.

2. **Create a New App Registration**
   - Navigate to **App registrations**.
   - Click on **New registration**.
   - Enter a name for your app (e.g., "PortalApp").
   - Choose the supported account types.
   - Enter the redirect URI if applicable.
   - Click **Register**.

3. **Configure API Permissions**
   - After registration, go to **API permissions**.
   - Click on **Add a permission**.
   - Select **Microsoft Graph**.
   - Choose the following permissions:
     - `User.Read`
     - `User.Read.All`
     - `User.ReadBasic.All`
     - `Presence.Read.All`
     - `Directory.Read.All`
     - `ProfilePhoto.ReadWrite.All`
   - Click **Add permissions**.

4. **Grant Admin Consent**
   - Click on **Grant admin consent for <Your Organization>**.
   - Confirm the action.

## Next Steps
To make this Application wor, you will need the Client ID and the Tenant ID

## Prerequisites
- Microsoft Azure account with admin access
- Microsoft 365 subscription with Teams
- Node.js (v18 or later)
- npm or yarn
