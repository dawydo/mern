const sendgrid = require('sendgrid')
const helper = sendgrid.mail
const keys = require('../config/keys')

// helper.Mail is sendgrid.mail
class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@dawydo.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        // Register this.body
        this.addContent(this.body);
        // Track link clicks
        this.addClickTracking();
        // Take list and register with email
        this.addRecipients();
    }


    // Recipients from MangoDB subdocuments
    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email)
        });
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    // Add recipients helper function
    addRecipients() {
        const personalize = new helper.Personalization();

        this.recipients.forEach(recipient => {
            personalize.addTo(recipient)
        });
        this.addPersonalization(personalize);
    }

    //Send to sendgrid by API
    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        })

        const response = await this.sgApi.API(request);
        return response;
    }
}


module.exports = Mailer;