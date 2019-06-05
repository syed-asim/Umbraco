using System;
using System.Collections.Generic;
using System.Linq;
using Umbraco.Core.Persistence;
using Umbraco.Core.Scoping;
using Umbraco.Data;

namespace Umbraco.BL
{
    public class SurveyBL
    {

        private readonly IScopeProvider scopeProvider;

        public SurveyBL(IScopeProvider scopeProvider)
        {
            this.scopeProvider = scopeProvider;
        }
        public List<Survey> GetSurveys()
        {
            using (var scope = scopeProvider.CreateScope(autoComplete: true))
            {
                return scope.Database.Fetch<Survey>();
            }
        }

        public Survey GetSurveyById(Guid surveyId)
        {
            using (var scope = scopeProvider.CreateScope(autoComplete: true))
            {

                var res = scope.Database.Single<Survey>("where SurveyId = @0", surveyId);
                return res;
            }
        }
        public int AddSurvey(Survey survey)
        {

            using (var scope = scopeProvider.CreateScope(autoComplete: true))
            {
                var res = scope.Database.Insert(survey);

                return Convert.ToInt32(res);
            }
        }
        public Survey UpdateSurvey()
        {
            return new Survey();
        }
        public Survey DeleteSurvey()
        {
            return new Survey();
        }



    }
}