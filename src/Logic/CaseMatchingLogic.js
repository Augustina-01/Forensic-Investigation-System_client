export const matchCasesByClues = (newClues, existingCases) => {
  const matches = [];
  
  existingCases.forEach(existingCase => {
    let matchScore = 0;
    const matchedClues = [];
    
    newClues.forEach(newClue => {
      existingCase.clues.forEach(existingClue => {
        if (existingClue.toLowerCase().includes(newClue.toLowerCase()) || 
            newClue.toLowerCase().includes(existingClue.toLowerCase())) {
          matchScore++;
          matchedClues.push(existingClue);
        }
      });
    });
    
    if (matchScore > 0) {
      matches.push({
        case: existingCase,
        matchScore,
        matchedClues,
        matchPercentage: ((matchScore / newClues.length) * 100).toFixed(2)
      });
    }
  });
  
  return matches.sort((a, b) => b.matchScore - a.matchScore);
};

export const analyzeThreatLevel = (clues, evidence) => {
  const highRiskKeywords = ['weapon', 'violence', 'armed', 'murder', 'assault', 'critical', 'breach'];
  const mediumRiskKeywords = ['theft', 'robbery', 'fraud', 'damage'];
  
  let threatScore = 0;
  const allData = [...clues, ...evidence].join(' ').toLowerCase();
  
  highRiskKeywords.forEach(keyword => {
    if (allData.includes(keyword)) threatScore += 3;
  });
  
  mediumRiskKeywords.forEach(keyword => {
    if (allData.includes(keyword)) threatScore += 1;
  });
  
  if (threatScore >= 6) return 'Critical';
  if (threatScore >= 3) return 'High';
  if (threatScore >= 1) return 'Medium';
  return 'Low';
};

export const findSuspectsBySimilarity = (cases) => {
  const suspectMap = new Map();
  
  cases.forEach(caseItem => {
    if (caseItem.suspect && caseItem.suspect !== 'Unknown') {
      if (!suspectMap.has(caseItem.suspect)) {
        suspectMap.set(caseItem.suspect, []);
      }
      suspectMap.get(caseItem.suspect).push(caseItem);
    }
  });
  
  return Array.from(suspectMap.entries()).map(([suspect, cases]) => ({
    suspect,
    caseCount: cases.length,
    cases
  }));
};
