interface PasswordResetEmailProps {
  userName: string;
  resetUrl: string;
  resetCode?: string;
  expiryMinutes?: number;
}

export const GeneratePasswordResetEmail = ({
  userName,
  resetUrl,
  resetCode,
  expiryMinutes = 30,
}: PasswordResetEmailProps): string => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset - Nexonic</title>
    <style>
      @media only screen and (max-width: 640px) {
        .content-padding { padding: 40px 30px !important; }
        .button { padding: 16px 40px !important; font-size: 16px !important; }
        .code-box { font-size: 28px !important; }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #0A0E27; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #0A0E27 0%, #1A1F3A 100%);">
      <tr>
        <td align="center" style="padding: 60px 20px;">

          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 640px;">
            
            <!-- Header Logo -->
            <tr>
              <td style="padding: 0 0 40px 0; text-align: center;">
                <div style="background: linear-gradient(135deg, #00D9FF 0%, #00ADB5 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 42px; font-weight: 900; letter-spacing: -1px; margin: 0;">
                  NEXONIC
                </div>
                <div style="height: 3px; width: 60px; background: linear-gradient(90deg, #00D9FF 0%, #00ADB5 100%); margin: 12px auto 0; border-radius: 2px;"></div>
              </td>
            </tr>

            <!-- Main Content Card -->
            <tr>
              <td>
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #FFFFFF; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 217, 255, 0.15);">
                  
                  <!-- Gradient Top Bar -->
                  <tr>
                    <td style="height: 6px; background: linear-gradient(90deg, #00D9FF 0%, #00ADB5 50%, #0099A0 100%);"></td>
                  </tr>

                  <!-- Content Body -->
                  <tr>
                    <td style="padding: 60px 50px; text-align: center;" class="content-padding">
                      
                      <!-- Greeting -->
                      <h1 style="font-size: 28px; color: #1A1F3A; margin: 0 0 15px; font-weight: 800;">
                        Hello, ${userName} 👋
                      </h1>

                      <!-- Main Heading -->
                      <h2 style="font-size: 22px; color: #00ADB5; margin: 10px 0 20px; font-weight: 700;">
                        Password Reset Request
                      </h2>

                      <!-- Message -->
                      <p style="font-size: 16px; color: #6B7280; margin: 0 0 35px; line-height: 1.6;">
                        We received a request to reset your password. ${
                          resetCode
                            ? "Use the OTP code below or click the button to reset your password."
                            : "Click the button below to reset your password."
                        }
                      </p>

                      <!-- OTP Code  -->
                      ${
                        resetCode
                          ? `<div style="background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%); border-radius: 12px; padding: 30px; margin: 35px 0; text-align: center;">
                               <p style="font-size: 14px; color: #6B7280; margin: 0 0 15px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                                 Your OTP Code
                               </p>
                               <div style="background: #FFFFFF; border: 2px dashed #00ADB5; border-radius: 12px; padding: 20px; display: inline-block; min-width: 250px;">
                                 <span style="font-size: 36px; font-weight: 800; color: #00ADB5; letter-spacing: 8px; font-family: 'Courier New', monospace;" class="code-box">
                                   ${resetCode}
                                 </span>
                               </div>
                               <p style="font-size: 13px; color: #9CA3AF; margin: 15px 0 0;">
                                 This code expires in <strong style="color: #00ADB5;">${expiryMinutes} minutes</strong>
                               </p>
                             </div>`
                          : ""
                      }

                      <!-- CTA Button -->
                      <div style="text-align: center; margin: 40px 0;">
                        <a href="${resetUrl}" target="_blank"
                          style="background: linear-gradient(135deg, #00ADB5 0%, #0099A0 100%); color: #FFFFFF; padding: 18px 50px; text-decoration: none; border-radius: 12px; font-size: 17px; font-weight: 700; display: inline-block; box-shadow: 0 8px 25px rgba(0, 173, 181, 0.3); letter-spacing: 0.3px;" class="button">
                          Reset Password
                        </a>
                      </div>

                      <!-- Security Tip -->
                      <div style="background: linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%); border-left: 4px solid #F59E0B; padding: 20px 25px; margin-bottom: 25px; border-radius: 8px; text-align: left;">
                        <p style="font-size: 14px; color: #92400E; margin: 0; line-height: 1.6;">
                          <strong style="color: #F59E0B;"> Security Tip:</strong> If you did not request a password reset, please ignore this email or secure your account immediately.
                        </p>
                      </div>

                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 40px 20px 20px; text-align: center;">
                <p style="font-size: 13px; color: #6B7280; margin: 0 0 12px; line-height: 1.6;">
                  This is an automated password reset email from your Nexonic account.
                </p>
                <p style="font-size: 12px; color: #9CA3AF; margin: 0 0 20px;">
                  &copy; ${new Date().getFullYear()} Nexonic Inc. All rights reserved.<br/>
                  <span style="font-size: 11px;">Founded by Rahul Sah</span>
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
