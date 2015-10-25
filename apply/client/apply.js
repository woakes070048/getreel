loadFilePicker('ASOqF4I2hQ5O6FgWUBsHLz');

Meteor.subscribe('availableJobs');

Session.set('application', {step: 1});

Template.Apply.helpers({
  application: function() {
    return Session.get('application');
  },

  isTabDisabled: function(tabNumber) {
    return tabNumber > Session.get('application').step;
  },

  availableJobs: function() {
    return Jobs.find();
  },
});

Template.Apply.rendered = function() {
  var dates = {
    calendar1: 'datePickerDateOfBirth',
    calendar2: 'datePickerPassportValidFrom',
    calendar3: 'datePickerPassportValidTo',
  };
  for (var calendar in dates) {
    $('#' + dates[calendar]).datepicker({
      autoclose: true,
      format: 'dd/mm/yyyy',
    });
  }
},

Template.Apply.events({
  'click #steps a': function(e) {
    e.preventDefault();

    var $link = $(e.target);
    if ($link.parent('li').hasClass('disabled')) {
      return;
    }

    var application = Session.get('application');
    application.step = $link.attr('href').slice(4);
    Session.set('application', application);

    $link.tab('show');
  },

  'change input, change select': function(e) {
    application = Session.get('application');
    application[e.target.name] = e.target.value;
    Session.set('application', application);
  },

  'click #resume': function(e) {
    filepicker.pick({
      mimetypes: [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf',
      ],
      maxSize: 10 * 1024 * 1024,
      multiple: false,
    }, function(InkBlob) {
      application = Session.get('application');
      application.resume = InkBlob.url;
      Session.set('application', application);
    });
  },

  'click #showreel': function(e) {
    filepicker.pick({
      mimetypes: [
        'video/mp4',
        'video/3gpp',
        'video/quicktime',
        'video/x-msvideo',
        'video/x-ms-wmv',
      ],
      maxSize: 10 * 1024 * 1024,
      multiple: false,
    }, function(InkBlob) {
      application = Session.get('application');
      application.videofile = InkBlob.url;
      Session.set('application', application);
    });
  },

  'submit form': function(e) {
    e.preventDefault();
    var form = e.target;

    application = Session.get('application');
    application.createdAt = new Date();
    application.applicant = Meteor.userId();

    /* TODO: form validation */
    /*for (name in application) {
      var arg = application[name];
      if (arg === undefined || arg === null || arg === '') {
        alert('Please fill in all form values');
        return;
      }
    };*/

    /*if (form.resume) {
      Resumes.insert(form.resume, function(err, fileObj) {
        application.resume = fileObj._id;
      });
    }

    if (form.videofile) {
      Showreels.insert(form.videofile, function(err, fileObj) {
        application.videofile = fileObj._id;
      });
    }*/

    Meteor.call('submit', application, function(error, result) {
      if (error) {
        alert('Have you signed in yet? Please do it now');
      } else {
        Router.go('/apply/success');
      }
    });
  },
});
