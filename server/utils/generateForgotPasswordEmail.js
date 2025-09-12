export const generateEmailTemplate = (resetPasswordUrl) => {
  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 40px auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
    <h2 style="color: #2d3436; text-align: center; margin-bottom: 20px;">🔐 Password Reset Request</h2>

    <p style="font-size: 16px; color: #444;">Hello 👋,</p>

    <p style="font-size: 16px; color: #444;">
      We received a request to reset your password. Click the button below to proceed:
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetPasswordUrl}" 
        style="background-color: #0984e3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">
        Reset Password
      </a>
    </div>

    <p style="font-size: 15px; color: #888; line-height: 1.5;">
      If the button above doesn't work, you can also copy and paste this link into your browser:
    </p>

    <p style="font-size: 14px; color: #333; word-wrap: break-word; background-color: #f4f4f4; padding: 10px; border-radius: 5px;">
      ${resetPasswordUrl}
    </p>

    <p style="font-size: 14px; color: #888;">
      ⚠️ This link is valid for only <strong>15 minutes</strong>. If you did not request this, you can safely ignore this email.
    </p>

    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

    <footer style="text-align: center;">
      <p style="font-size: 13px; color: #aaa;">
        🔒 This is an automated message from <strong>Nexonic</strong>. Please do not reply to this email.
      </p>
    </footer>
  </div>
  `;
};
