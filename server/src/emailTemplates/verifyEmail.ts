interface VerifyEmailProps {
  userName: string;
  verificationUrl: string;
  verificationCode: string;
}

export const GenerateVerifyEmailTemplate = ({
  userName,
  verificationUrl,
  verificationCode,
}: VerifyEmailProps): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email - Nexonic</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0A0E27; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      
      <div style="display: none; font-size: 1px; color: #0A0E27; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Verify your email address to activate your Nexonic account
      </div>

      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #0A0E27 0%, #1A1F3A 100%);">
        <tr>
          <td align="center" style="padding: 60px 20px;">
            
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 640px;">
              
              <!-- Header Logo -->
              <tr>
                <td style="padding: 0 0 40px 0; text-align: center;">
                  <div style="background: linear-gradient(135deg, #00D9FF 0%, #00ADB5 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 42px; font-weight: 900; letter-spacing: -1px; margin: 0;">
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
                      <td style="padding: 60px 50px;">
                        
                        <!-- Verification Icon -->
                        <div style="text-align: center; margin-bottom: 35px;">
                          <div style="display: inline-block; width: 80px; height: 80px; background: linear-gradient(135deg, #00D9FF 0%, #00ADB5 100%); border-radius: 50%; box-shadow: 0 10px 30px rgba(0, 173, 181, 0.25);">
                            <span style="font-size: 40px; line-height: 80px; display: block;">✉️</span>
                          </div>
                        </div>

                        <!-- Main Heading -->
                        <h1 style="font-size: 32px; color: #1A1F3A; margin: 0 0 15px; text-align: center; font-weight: 800; letter-spacing: -0.5px;">
                          Verify Your Email Address
                        </h1>

                        <!-- Personalized Greeting -->
                        <p style="font-size: 18px; color: #00ADB5; margin: 0 0 30px; text-align: center; font-weight: 600;">
                          Hi ${userName}, you're almost there! 🚀
                        </p>

                        <!-- Message -->
                        <p style="font-size: 16px; color: #6B7280; margin: 0 0 35px; text-align: center; line-height: 1.7;">
                          We need to verify your email address to complete your Nexonic account setup. This helps us keep your account secure and ensures you receive important updates.
                        </p>

                        <!-- Verification Code Box -->
                        <div style="background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%); border-radius: 12px; padding: 30px; margin: 35px 0; text-align: center;">
                          <p style="font-size: 14px; color: #6B7280; margin: 0 0 15px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                            Your Verification Code
                          </p>
                          <div style="background: #FFFFFF; border: 2px dashed #00ADB5; border-radius: 12px; padding: 20px; display: inline-block; min-width: 250px;">
                            <span style="font-size: 36px; font-weight: 800; color: #00ADB5; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                              ${verificationCode}
                            </span>
                          </div>
                          <p style="font-size: 13px; color: #9CA3AF; margin: 15px 0 0;">
                            This code expires in <strong style="color: #00ADB5;">30 minutes</strong>
                          </p>
                        </div>

                        <!-- CTA Button -->
                        <div style="text-align: center; margin: 40px 0;">
                          <a href="${verificationUrl}" 
                            target="_blank" 
                            style="background: linear-gradient(135deg, #00ADB5 0%, #0099A0 100%); color: #FFFFFF; padding: 18px 50px; text-decoration: none; border-radius: 12px; font-size: 17px; font-weight: 700; display: inline-block; box-shadow: 0 8px 25px rgba(0, 173, 181, 0.3); letter-spacing: 0.3px;">
                            Verify Email Address
                          </a>
                        </div>

                        <!-- Divider -->
                        <div style="text-align: center; margin: 40px 0 30px; position: relative;">
                          <div style="border-top: 1px solid #E5E7EB; position: relative;">
                            <span style="background: #FFFFFF; padding: 0 15px; position: relative; top: -12px; font-size: 13px; color: #9CA3AF; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                              Or copy this link
                            </span>
                          </div>
                        </div>

                        <!-- Fallback Link -->
                        <div style="background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 10px; padding: 20px; margin-bottom: 35px;">
                          <p style="font-size: 13px; color: #6B7280; margin: 0 0 12px; text-align: center; font-weight: 600;">
                            Paste this URL in your browser:
                          </p>
                          <div style="background: #FFFFFF; border: 1px solid #D1D5DB; border-radius: 6px; padding: 14px; word-break: break-all; font-family: 'Courier New', monospace; font-size: 12px; color: #374151; text-align: center; line-height: 1.6;">
                            ${verificationUrl}
                          </div>
                        </div>

                        <!-- Security Info Box -->
                        <div style="background: linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%); border-left: 4px solid #F59E0B; padding: 20px 25px; margin-bottom: 25px; border-radius: 8px;">
                          <p style="font-size: 14px; color: #92400E; margin: 0; line-height: 1.6;">
                            <strong style="color: #F59E0B;"> Security Tip:</strong> If you didn't create a Nexonic account, please ignore this email or contact our support team immediately.
                          </p>
                        </div>

                        <!-- Support Section -->
                        <div style="text-align: center; padding-top: 30px; border-top: 1px solid #F3F4F6;">
                          <p style="font-size: 14px; color: #9CA3AF; margin: 0 0 8px;">
                            Having trouble verifying your email?
                          </p>
                          <p style="font-size: 14px; color: #6B7280; margin: 0;">
                            <a href="mailto:support@nexonic.com" style="color: #00ADB5; text-decoration: none; font-weight: 600;">Contact Support</a>
                            <span style="margin: 0 8px; color: #D1D5DB;">|</span>
                            <a href="#" style="color: #00ADB5; text-decoration: none; font-weight: 600;">Help Center</a>
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
                    This verification email was sent because an account was created using this email address.
                  </p>
                  <p style="font-size: 12px; color: #9CA3AF; margin: 0 0 20px;">
                    &copy; ${new Date().getFullYear()} Nexonic Inc. All rights reserved.<br/>
                    <span style="font-size: 11px;">Founded by Rahul Sah</span>
                  </p>
                  <div style="margin-top: 20px;">
                    <a href="#" style="color: #00ADB5; text-decoration: none; font-size: 12px; margin: 0 12px; font-weight: 500;">Privacy Policy</a>
                    <span style="color: #4B5563;">•</span>
                    <a href="#" style="color: #00ADB5; text-decoration: none; font-size: 12px; margin: 0 12px; font-weight: 500;">Terms of Service</a>
                    <span style="color: #4B5563;">•</span>
                    <a href="#" style="color: #00ADB5; text-decoration: none; font-size: 12px; margin: 0 12px; font-weight: 500;">Contact Us</a>
                  </div>
                </td>
              </tr>

            </table>
            
          </td>
        </tr>
      </table>

      <style>
        @media only screen and (max-width: 640px) {
          .content-padding { padding: 40px 30px !important; }
          .code-box { min-width: 200px !important; font-size: 28px !important; }
        }
      </style>
      
    </body>
    </html>
  `;
};
