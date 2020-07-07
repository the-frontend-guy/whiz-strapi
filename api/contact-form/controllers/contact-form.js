const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const modelName = "contact-form";
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services[modelName].create(data, { files });
    } else {
      entity = await strapi.services[modelName].create(ctx.request.body);
    }
    await strapi.plugins["email"].services.email.send({
      to: "info@whizwafture.com",
      from: "vikas.p@bewdigital.com",
      subject: "Whizwafture - New Enquiry",
      html: `
      <div id=":1hi" class="ii gt"><div id=":1hh" class="a3s aXjCH "><div dir="ltr"><div dir="ltr"><div dir="ltr"><p style="margin:0px;font-stretch:normal;line-height:normal"><font face="arial, sans-serif">Hi Team,</font></p>
<p style="margin:0px;font-stretch:normal;line-height:normal;min-height:14px"><font face="arial, sans-serif"><br></font></p>
<p style="margin:0px;font-stretch:normal;line-height:normal"><font face="arial, sans-serif">Greetings for the day!!!</font></p>
<p style="margin:0px;font-stretch:normal;line-height:normal;min-height:14px"><font face="arial, sans-serif"><br></font></p>
<p style="margin:0px;font-stretch:normal;line-height:normal"><font face="arial, sans-serif">Here is a new enquiry for you. Below are the details :&nbsp;</font></p><p style="margin:0px;font-stretch:normal;line-height:normal"><font face="arial, sans-serif"><br></font></p>
<p style="margin:0px;font-stretch:normal;line-height:normal"><span style="color:rgb(0,0,0);font-family:-webkit-standard"></span></p><table cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;font-size:10pt;font-family:Arial;width:0px;border-collapse:collapse;border:none"><colgroup><col width="195"><col width="497"></colgroup><tbody><tr style="height:30px"><td style="border:1px solid rgb(0,0,0);overflow:hidden;padding:2px 3px;vertical-align:middle;font-weight:bold;white-space:normal;word-wrap:break-word">Id</td><td style="border-width:1px;border-style:solid;border-color:rgb(0,0,0) rgb(0,0,0) rgb(0,0,0) rgb(204,204,204);overflow:hidden;padding:2px 3px;vertical-align:middle;white-space:normal;word-wrap:break-word">${entity.id}</td></tr><tr style="height:30px"><td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) rgb(0,0,0) rgb(0,0,0);overflow:hidden;padding:2px 3px;vertical-align:middle;font-weight:bold;white-space:normal;word-wrap:break-word">Name</td><td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) rgb(0,0,0) rgb(0,0,0) rgb(204,204,204);overflow:hidden;padding:2px 3px;vertical-align:middle;white-space:normal;word-wrap:break-word">${entity.name}</td></tr><tr style="height:30px"><td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) rgb(0,0,0) rgb(0,0,0);overflow:hidden;padding:2px 3px;vertical-align:middle;font-weight:bold;white-space:normal;word-wrap:break-word">Mobile Number</td><td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) rgb(0,0,0) rgb(0,0,0) rgb(204,204,204);overflow:hidden;padding:2px 3px;vertical-align:middle;white-space:normal;word-wrap:break-word">${entity.number}</td></tr><tr style="height:30px"><td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) rgb(0,0,0) rgb(0,0,0);overflow:hidden;padding:2px 3px;vertical-align:middle;font-weight:bold;white-space:normal;word-wrap:break-word">Email Id</td><td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) rgb(0,0,0) rgb(0,0,0) rgb(204,204,204);overflow:hidden;padding:2px 3px;vertical-align:middle;white-space:normal;word-wrap:break-word"><a href="mailto:${entity.email}" target="_blank">${entity.email}</a></td></tr><tr style="height:30px"><td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) rgb(0,0,0) rgb(0,0,0);overflow:hidden;padding:2px 3px;vertical-align:middle;font-weight:bold;white-space:normal;word-wrap:break-word">Service</td><td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) rgb(0,0,0) rgb(0,0,0) rgb(204,204,204);overflow:hidden;padding:2px 3px;vertical-align:middle;white-space:normal;word-wrap:break-word">${entity.services}</td></tr><tr style="height:65px"><td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) rgb(0,0,0) rgb(0,0,0);overflow:hidden;padding:2px 3px;vertical-align:middle;font-weight:bold;white-space:normal;word-wrap:break-word">Description</td><td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) rgb(0,0,0) rgb(0,0,0) rgb(204,204,204);overflow:hidden;padding:2px 3px;vertical-align:middle;white-space:normal;word-wrap:break-word">${entity.description}</td></tr><tr style="height:30px"><td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) rgb(0,0,0) rgb(0,0,0);overflow:hidden;padding:2px 3px;vertical-align:middle;font-weight:bold;white-space:normal;word-wrap:break-word">Attachment</td><td style="border-width:1px;border-style:solid;border-color:rgb(204,204,204) rgb(0,0,0) rgb(0,0,0) rgb(204,204,204);overflow:hidden;padding:2px 3px;vertical-align:middle;white-space:normal;word-wrap:break-word">${entity.uploaded_file ? 'Yes' : 'No'}</td></tr></tbody></table>
<p style="margin:0px;font-stretch:normal;line-height:normal;min-height:14px"><font face="arial, sans-serif"><br></font></p>
<p style="margin:0px;font-stretch:normal;line-height:normal"><font face="arial, sans-serif">Happy working.</font></p>
<p style="margin:0px;font-stretch:normal;line-height:normal;min-height:14px"><font face="arial, sans-serif"><br></font></p>
<p style="margin:0px;font-stretch:normal;line-height:normal"><font face="arial, sans-serif">Regards,</font></p>
<p style="margin:0px;font-stretch:normal;line-height:normal"><font face="arial, sans-serif">Whizwafture - Website</font></p><p style="margin:0px;font-stretch:normal;line-height:normal"><font face="arial, sans-serif"><br></font></p><p style="margin:0px;font-stretch:normal;line-height:normal"><font face="arial, sans-serif"><br></font></p></div></div></div><div class="yj6qo"></div><div class="adL">
</div></div></div>`,
      // html: `
      // <div>Hi Team,</div>
      // <div>Greetings for the day!!!</div>
      // <div>Here is a new enquiry for you. Below are the details : </div>
      // <table>
      // <tbody>
      // <tr>
      // <td style="padding: 1rem; border: 1px solid;">Id</td>
      // <td style="padding: 1rem; border: 1px solid;">${entity.id}</td>
      // </tr>
      // <tr>
      // <td style="padding: 1rem; border: 1px solid;">Name</td>
      // <td style="padding: 1rem; border: 1px solid;">${entity.name}</td>
      // </tr>
      // <tr>
      // <td style="padding: 1rem; border: 1px solid;">Email</td>
      // <td style="padding: 1rem; border: 1px solid;">${entity.email}</td>
      // </tr>
      // <tr>
      // <td style="padding: 1rem; border: 1px solid;">Phone</td>
      // <td style="padding: 1rem; border: 1px solid;">${entity.phone}</td>
      // </tr>
      // <tr>
      // <td style="padding: 1rem; border: 1px solid;">Description</td>
      // <td style="padding: 1rem; border: 1px solid;">${entity.description}</td>
      // </tr>
      // <tr>
      // <td style="padding: 1rem; border: 1px solid;">Services</td>
      // <td style="padding: 1rem; border: 1px solid;">${entity.services}</td>
      // </tr>
      // <tr>
      // <td style="padding: 1rem; border: 1px solid;">File</td>
      // <td style="padding: 1rem; border: 1px solid;">${entity.uploaded_file ? 'Yes' : 'No'}</td>
      // </tr>
      // </tbody>
      // </table>
      // `
    });
    return sanitizeEntity(entity, { model: strapi.models[modelName] });
  },
};
