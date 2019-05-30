import { vid } from './viewId';

const TOOLTIP_TEXT = 'Send current search terms to ';

/**
 * Config values for External Search.
 */
export const searchTargets = [
  {
    name: 'Worldcat',
    // url: 'https://arizonastateuniversitylibraries.on.worldcat.org/search?databaseList=&queryString=',
    url: 'https://www.worldcat.org/search?qt=owc_search&q=',
    img: `custom/${vid}/img/worldcat-logo.png`,
    tooltip: `${TOOLTIP_TEXT} WorldCat.`,
    mapping: function (queries) {
      if (typeof queries === 'string') queries = [queries];
      const query_mappings = {
        'any': 'kw',
        'title': 'ti',
        'creator': 'au',
        'sub': 'su',
        'isbn': 'bn',
        'issn': 'n2'
      }
      try {
        // console.log(`queries: ${queries}`);
        const ret = '' + queries.map((part, i) => {
          let terms = part.split(',');
          let type = query_mappings[terms[0]] || 'kw';
          let string = `(${terms[2]})` || '';
          let join = (i+1 < queries.length) ? terms[3] || '' : '';
          return type + ':' + string + ' ' + join + ' '
        }).join('').trim();
        // console.log(`returning to Worldcat:`, ret);
        return ret;
      }
      catch (e) {
        // console.error('Worldcat searchTarget error:', e);
        return '';
      }
    }
  },
  {
    name: 'Google Scholar',
    url: 'https://scholar.google.com/scholar?q=',
    img: `custom/${vid}/img/google-logo.png`,
    tooltip: `${TOOLTIP_TEXT} Google Scholar.`,
    mapping: function (queries) {
      if (typeof queries === 'string') queries = [queries];
      try {
        const ret = queries.map(part => part.split(',')[2] || '').join(' ');
        // console.log(`returning to Google Scholar:`, ret);
        return ret;
      }
      catch (e) {
        // console.error('Google Scholar searchTarget error:', e);
        return ''
      }
    }
  }
];
