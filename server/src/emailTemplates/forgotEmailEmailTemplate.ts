interface ForgotPasswordProps {
  resetPasswordUrl: string;
}

export const forgotEmailEmailTemplate = ({
  resetPasswordUrl,
}: ForgotPasswordProps): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset - Nexonic</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333;">
      
      <!-- Preheader (hidden but shows in email preview) -->
      <div style="display: none; font-size: 1px; color: #f8f9fa; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Reset your Nexonic password securely in just a few steps.
      </div>

      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8f9fa;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            
            <!-- Main Content Card -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); border-radius: 16px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); border: 1px solid #e9ecef;">
              <tr>
                <td style="padding: 50px 40px 40px;">
                  
                  <!-- Logo/Header with Icon -->
                  <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="font-size: 32px; color: #00ADB5; margin: 0; font-weight: 800; letter-spacing: 0.5px; text-shadow: 0 2px 4px rgba(0, 173, 181, 0.1);">
                      Nexonic
                    </h1>
                    <div style="font-size: 24px; color: #00ADB5; margin: 10px 0; font-weight: 600;">
                      🔐 Password Reset
                    </div>
                  </div>

                  <!-- Greeting -->
                  <p style="font-size: 18px; color: #495057; margin: 0 0 25px; text-align: center; font-weight: 500;">
                    Hi User,
                  </p>

                  <!-- Body Text -->
                  <p style="font-size: 16px; color: #6c757d; margin-bottom: 30px; text-align: center;">
                    We've received a request to reset your password for your <strong style="color: #00ADB5;">Nexonic</strong> account. No worries—it's quick and secure!
                  </p>

                  <p style="font-size: 16px; color: #6c757d; margin-bottom: 40px; text-align: center;">
                    Click the button below to create a new password. If you didn't request this, you can safely ignore this email.
                  </p>

                  <!-- CTA Button with Hover Effect Simulation -->
                  <div style="text-align: center; margin-bottom: 35px;">
                    <a href="${resetPasswordUrl}" 
                      target="_blank" 
                      style="background: linear-gradient(135deg, #00ADB5 0%, #009DA0 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 12px; font-size: 18px; font-weight: 700; display: inline-block; box-shadow: 0 6px 20px rgba(0, 173, 181, 0.3); transition: all 0.3s ease; border: none; min-width: 200px; text-align: center;"
                      onmouseover="this.style.background='linear-gradient(135deg, #009DA0 0%, #008f95 100%)'; this.style.boxShadow='0 8px 25px rgba(0, 173, 181, 0.4)';"
                      onmouseout="this.style.background='linear-gradient(135deg, #00ADB5 0%, #009DA0 100%)'; this.style.boxShadow='0 6px 20px rgba(0, 173, 181, 0.3)';"
                    >
                      Reset Password Now
                    </a>
                  </div>

                  <!-- Fallback Link -->
                  <p style="font-size: 14px; color: #868e96; line-height: 1.5; text-align: center; margin-bottom: 5px;">
                    Having trouble with the button? <strong>Copy and paste this link:</strong>
                  </p>

                  <div style="margin: 15px 0 40px; text-align: center;">
                    <span style="font-size: 13px; color: #495057; word-wrap: break-word; background-color: #f8f9fa; padding: 12px 18px; border-radius: 8px; display: inline-block; max-width: 95%; text-align: left; border: 1px solid #e9ecef; font-family: monospace;">
                      ${resetPasswordUrl}
                    </span>
                  </div>

                  <!-- Warning/Expiration Box -->
                  <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 10px; padding: 15px; margin-bottom: 10px; text-align: center;">
                    <p style="font-size: 14px; color: #856404; margin: 0; font-weight: 600;">
                      ⏰ This secure link expires in <strong>15 minutes</strong>. Act fast!
                    </p>
                  </div>
                  
                </td>
              </tr>
            </table>

            <!-- Footer Section -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin-top: 30px;">
              <tr>
                <td style="padding: 30px 40px; text-align: center; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
                  <hr style="border: none; border-top: 1px solid #e9ecef; margin: 20px 0;">
                  <p style="font-size: 13px; color: #adb5bd; margin: 0 0 10px; line-height: 1.5;">
                    Need help? Contact us at <a href="mailto:support@nexonic.com" style="color: #00ADB5; text-decoration: none;">support@nexonic.com</a>
                  </p>
                  <p style="font-size: 12px; color: #adb5bd; margin: 0;">
                    &copy; ${new Date().getFullYear()} Nexonic Inc. All rights reserved. | <a href="#" style="color: #00ADB5; text-decoration: none; font-size: 11px;">Privacy Policy</a> | <a href="#" style="color: #00ADB5; text-decoration: none; font-size: 11px;">Terms of Service</a>
                  </p>
                </td>
              </tr>
            </table>
            
          </td>
        </tr>
      </table>

      <!-- Mobile Responsiveness Helper -->
      <style>
        @media only screen and (max-width: 600px) {
          .email-container { width: 100% !important; padding: 10px !important; }
          .main-card { border-radius: 8px !important; padding: 20px !important; }
          .button { width: 100% !important; padding: 15px !important; font-size: 16px !important; }
        }
      </style>
      
    </body>
    </html>
  `;
};

const sendEmailPasswordLink = () => {};
