import allLanguages from './languages';


const languageMatcher = (queryText) => {
  /* const normalizedMessage = queryText.replace(/[^a-z]/gi, '').toLowerCase();
  const match = allLanguages.filter(lang => lang.values.includes(normalizedMessage));

  if (!match.length) {
    return 'de';
  }
  return match[0].language; */
  console.log('language matcher turned off');
  return 'en';
};


export default languageMatcher;
