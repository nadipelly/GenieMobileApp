

var domain = 'https://geniehealthjobs.com/api/'
// var domain ='http://genieportal-qa-1.pafs9xqdp8.us-west-2.elasticbeanstalk.com/api/'
// var domain = 'http://genie-jobs-portal-qa.pafs9xqdp8.us-west-2.elasticbeanstalk.com/api/'
export default production = {

      loginAPI: domain + 'authenticate',
      recruitersAPI: domain + 'recruiter-profiles/getAllRecruiterProfiles',
      isCandidateApplied: domain + 'job-applications/candidate-earlier-applied/',
      isCandidateRegistered: domain + 'users/is-emailid-registered/',
      getCandidateInfoAPI: domain + 'job-applications/-999/',
      submitRegistrationAPI: domain + 'job-applications?cacheBuster=1597147649991',
      changePasswordAPI: domain + 'account/change_password',
      saveSettingsAPI: domain + 'account',
      professionsAPI: domain + 'candidate-professions/getAllCandidateProfessions',
      specialityAPI: domain + 'candidate-specialties/get-all-by-profession/',
      statesAPI: domain + 'states/getAllStates',
      signupAPI: domain + 'register?cacheBuster=1597068051517',
      profileDetailsAPI: domain + 'candidate-profiles/-999?cacheBuster=1598268861239',
      submitprofileAPI: domain + 'candidate-profiles?cacheBuster=1598269049355',
      jobsSearchAPI: domain + 'jobs/search?cacheBuster=1595839887198&page=',
      jobsListAPI: domain + 'jobs?cacheBuster=1593595456188&page=',
      forgotPasswordAPI: domain + 'account/reset_password/init',
};