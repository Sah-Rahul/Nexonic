export const NotificationType = {
  PASSWORD_CHANGED: "PASSWORD_CHANGED",
  EMAIL_CHANGED: "EMAIL_CHANGED",
  PROFILE_UPDATED: "PROFILE_UPDATED",
  NEW_LOGIN: "NEW_LOGIN",
  SECURITY_ALERT: "SECURITY_ALERT",
  ACCOUNT_ACTIVATED: "ACCOUNT_ACTIVATED",
  ACCOUNT_DEACTIVATED: "ACCOUNT_DEACTIVATED",
  WISHLIST_UPDATE: "WISHLIST_UPDATE",
  CART_REMINDER: "CART_REMINDER",
};

interface AccountNotificationProps {
  userName: string;
  userEmail: string;
  notificationType: string;
  customTitle?: string;
  customMessage?: string;
  actionUrl?: string;
  actionText?: string;
  metadata?: {
    ipAddress?: string;
    device?: string;
    location?: string;
    timestamp?: string;
    [key: string]: any;
  };
}

const getNotificationDetails = (type: string, metadata?: any) => {
  const notifications: Record<
    string,
    { icon: string; title: string; message: string; color: string }
  > = {
    PASSWORD_CHANGED: {
      icon: "🔒",
      title: "Password Successfully Changed",
      message:
        "Your account password has been changed successfully. If you did not make this change, please contact our support team immediately.",
      color: "#10B981",
    },
    EMAIL_CHANGED: {
      icon: "📧",
      title: "Email Address Updated",
      message: `Your email address has been updated to ${metadata?.newEmail || "a new address"}. You will now use this email to log in to your Nexonic account.`,
      color: "#3B82F6",
    },
    PROFILE_UPDATED: {
      icon: "👤",
      title: "Profile Updated Successfully",
      message:
        "Your profile information has been updated. You can view your updated profile in your account dashboard.",
      color: "#8B5CF6",
    },
    NEW_LOGIN: {
      icon: "🔐",
      title: "New Login Detected",
      message: `We detected a new login to your account from ${metadata?.device || "an unknown device"} at ${metadata?.location || "an unknown location"}. If this wasn't you, please secure your account immediately.`,
      color: "#F59E0B",
    },
    SECURITY_ALERT: {
      icon: "⚠️",
      title: "Security Alert",
      message:
        "We detected unusual activity on your account. Please review your recent account activity and update your password if necessary.",
      color: "#EF4444",
    },
    ACCOUNT_ACTIVATED: {
      icon: "✅",
      title: "Account Activated",
      message:
        "Your Nexonic account has been successfully activated. You now have full access to all features and services.",
      color: "#10B981",
    },
    ACCOUNT_DEACTIVATED: {
      icon: "🚫",
      title: "Account Deactivated",
      message:
        "Your Nexonic account has been deactivated. If you believe this is a mistake, please contact our support team.",
      color: "#6B7280",
    },
    WISHLIST_UPDATE: {
      icon: "❤️",
      title: "Wishlist Item Update",
      message: `Great news! An item from your wishlist is ${metadata?.action || "now available"}. Check it out before it's gone!`,
      color: "#EC4899",
    },
    CART_REMINDER: {
      icon: "🛒",
      title: "Items Waiting in Your Cart",
      message: `You have ${metadata?.itemCount || "items"} in your cart. Complete your purchase before they sell out!`,
      color: "#F59E0B",
    },
  };

  return (
    notifications[type] || {
      icon: "📬",
      title: "Account Notification",
      message: "You have a new notification regarding your Nexonic account.",
      color: "#00ADB5",
    }
  );
};

export const generateAccountNotificationTemplate = ({
  userName,
  userEmail,
  notificationType,
  customTitle,
  customMessage,
  actionUrl,
  actionText = "View Account",
  metadata = {},
}: AccountNotificationProps): string => {
  const details = getNotificationDetails(notificationType, metadata);
  const title = customTitle || details.title;
  const message = customMessage || details.message;
  const icon = details.icon;
  const accentColor = details.color;

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title} - Nexonic</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0A0E27; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      
      <div style="display: none; font-size: 1px; color: #0A0E27; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        ${title} - Important notification from Nexonic
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
                        
                        <!-- Notification Icon -->
                        <div style="text-align: center; margin-bottom: 35px;">
                          <div style="display: inline-block; width: 80px; height: 80px; background: ${accentColor}; border-radius: 50%; box-shadow: 0 10px 30px rgba(0, 173, 181, 0.25);">
                            <span style="font-size: 40px; line-height: 80px; display: block;">${icon}</span>
                          </div>
                        </div>

                        <!-- Main Heading -->
                        <h1 style="font-size: 28px; color: #1A1F3A; margin: 0 0 15px; text-align: center; font-weight: 800; letter-spacing: -0.5px;">
                          ${title}
                        </h1>

                        <!-- Personalized Greeting -->
                        <p style="font-size: 18px; color: #00ADB5; margin: 0 0 30px; text-align: center; font-weight: 600;">
                          Hi ${userName}, 👋
                        </p>

                        <!-- Notification Message -->
                        <p style="font-size: 16px; color: #6B7280; margin: 0 0 35px; text-align: center; line-height: 1.7;">
                          ${message}
                        </p>

                        <!-- Metadata Box (if available) -->
                        ${
                          metadata && Object.keys(metadata).length > 0
                            ? `
                        <div style="background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%); border-radius: 12px; padding: 25px; margin: 35px 0; border-left: 4px solid ${accentColor};">
                          <p style="font-size: 14px; color: #374151; margin: 0 0 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                            📋 Activity Details
                          </p>
                          ${
                            metadata.timestamp
                              ? `
                          <p style="font-size: 14px; color: #6B7280; margin: 8px 0; line-height: 1.6;">
                            <strong style="color: #1A1F3A;">Time:</strong> ${metadata.timestamp}
                          </p>`
                              : `
                          <p style="font-size: 14px; color: #6B7280; margin: 8px 0; line-height: 1.6;">
                            <strong style="color: #1A1F3A;">Date:</strong> ${currentDate}
                          </p>
                          <p style="font-size: 14px; color: #6B7280; margin: 8px 0; line-height: 1.6;">
                            <strong style="color: #1A1F3A;">Time:</strong> ${currentTime}
                          </p>`
                          }
                          ${
                            metadata.device
                              ? `
                          <p style="font-size: 14px; color: #6B7280; margin: 8px 0; line-height: 1.6;">
                            <strong style="color: #1A1F3A;">Device:</strong> ${metadata.device}
                          </p>`
                              : ""
                          }
                          ${
                            metadata.location
                              ? `
                          <p style="font-size: 14px; color: #6B7280; margin: 8px 0; line-height: 1.6;">
                            <strong style="color: #1A1F3A;">Location:</strong> ${metadata.location}
                          </p>`
                              : ""
                          }
                          ${
                            metadata.ipAddress
                              ? `
                          <p style="font-size: 14px; color: #6B7280; margin: 8px 0; line-height: 1.6;">
                            <strong style="color: #1A1F3A;">IP Address:</strong> ${metadata.ipAddress}
                          </p>`
                              : ""
                          }
                        </div>`
                            : ""
                        }

                        <!-- CTA Button (if provided) -->
                        ${
                          actionUrl
                            ? `
                        <div style="text-align: center; margin: 40px 0;">
                          <a href="${actionUrl}" 
                            target="_blank" 
                            style="background: linear-gradient(135deg, #00ADB5 0%, #0099A0 100%); color: #FFFFFF; padding: 18px 50px; text-decoration: none; border-radius: 12px; font-size: 17px; font-weight: 700; display: inline-block; box-shadow: 0 8px 25px rgba(0, 173, 181, 0.3); letter-spacing: 0.3px;">
                            ${actionText}
                          </a>
                        </div>`
                            : ""
                        }

                        <!-- Security Info Box -->
                        <div style="background: linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%); border-left: 4px solid #F59E0B; padding: 20px 25px; margin: 35px 0 25px; border-radius: 8px;">
                          <p style="font-size: 14px; color: #92400E; margin: 0; line-height: 1.6;">
                            <strong style="color: #F59E0B;">🔒 Security Reminder:</strong> If you didn't perform this action or don't recognize this activity, please secure your account immediately by changing your password or contacting support.
                          </p>
                        </div>

                        <!-- Support Section -->
                        <div style="text-align: center; padding-top: 30px; border-top: 1px solid #F3F4F6;">
                          <p style="font-size: 14px; color: #9CA3AF; margin: 0 0 8px;">
                            Need help or have questions?
                          </p>
                          <p style="font-size: 14px; color: #6B7280; margin: 0;">
                            <a href="mailto:support@nexonic.com" style="color: #00ADB5; text-decoration: none; font-weight: 600;">support@nexonic.com</a>
                            <span style="margin: 0 8px; color: #D1D5DB;">|</span>
                            <a href="${process.env.FRONTEND_URL || "#"}/help" style="color: #00ADB5; text-decoration: none; font-weight: 600;">Help Center</a>
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
                  <p style="font-size: 13px; color: #6B7280; margin: 0 0 8px; line-height: 1.6;">
                    This notification was sent to <strong>${userEmail}</strong>
                  </p>
                  <p style="font-size: 12px; color: #9CA3AF; margin: 0 0 20px;">
                    You're receiving this email because of activity on your Nexonic account.
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
          .button { width: 100% !important; padding: 16px 40px !important; font-size: 16px !important; }
        }
      </style>
      
    </body>
    </html>
  `;
};

//  Send password changed notification

export const sendPasswordChangedNotification = async (
  userName: string,
  userEmail: string,
  sendEmailFunc: Function
) => {
  const html = generateAccountNotificationTemplate({
    userName,
    userEmail,
    notificationType: NotificationType.PASSWORD_CHANGED,
    actionUrl: `${process.env.FRONTEND_URL}/account/security`,
    actionText: "Review Security Settings",
    metadata: {
      timestamp: new Date().toLocaleString(),
    },
  });

  await sendEmailFunc({
    email: userEmail,
    subject: "Password Changed Successfully - Nexonic",
    html,
  });
};

// Send new login notification

export const sendNewLoginNotification = async (
  userName: string,
  userEmail: string,
  device: string,
  location: string,
  ipAddress: string,
  sendEmailFunc: Function
) => {
  const html = generateAccountNotificationTemplate({
    userName,
    userEmail,
    notificationType: NotificationType.NEW_LOGIN,
    actionUrl: `${process.env.FRONTEND_URL}/account/activity`,
    actionText: "View Account Activity",
    metadata: {
      device,
      location,
      ipAddress,
      timestamp: new Date().toLocaleString(),
    },
  });

  await sendEmailFunc({
    email: userEmail,
    subject: "New Login Detected - Nexonic",
    html,
  });
};

// Send profile updated notification

export const sendProfileUpdatedNotification = async (
  userName: string,
  userEmail: string,
  sendEmailFunc: Function
) => {
  const html = generateAccountNotificationTemplate({
    userName,
    userEmail,
    notificationType: NotificationType.PROFILE_UPDATED,
    actionUrl: `${process.env.FRONTEND_URL}/profile`,
    actionText: "View Profile",
  });

  await sendEmailFunc({
    email: userEmail,
    subject: "Profile Updated Successfully - Nexonic",
    html,
  });
};
