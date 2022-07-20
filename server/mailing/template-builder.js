module.exports = async (obj) => {
  if (!obj.subject || !obj.text || !obj.email) {
    throw new Error('Subject, text and email must be specified');
  }

  const text = obj.text
    .replace(/<!firstName>/g, obj.firstName)
    .replace(/<!restoreUserLink>/g, `https://${process.env.MAILING_MESSAGE_DOMAIN ? process.env.MAILING_MESSAGE_DOMAIN : 'scandify.tk'}/user/restore/${encodeURIComponent(obj.jwt)}`)

  const html = obj.html ? obj.html
      .replace(/<!firstName>/g, obj.firstName)
      .replace(/<!restoreUserLink>/g, `https://${process.env.MAILING_MESSAGE_DOMAIN ? process.env.MAILING_MESSAGE_DOMAIN : 'scandify.tk'}/user/restore/${encodeURIComponent(obj.jwt)}`)

    : undefined;
  return {
    subject: obj.subject,
    to: obj.email,
    text: text,
    html: html
  };
};