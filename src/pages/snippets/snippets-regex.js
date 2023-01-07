/**
 * Lookahead assertion
 * User want to escape ':' and '.' in
 * [ab:1.2:ef]='12.3' => [ab\:1\.2\:ef]='12.3'
 */
 
result = subject.replace(/([:.])(?=[^[\]]*\])/g, "\\$1");
([:.])    # Match and remember a dot/colon,
(?=       # only if it is followed by:
[^[\]]*  # any number of characters excluding brackets,
\]       # followed by a closing bracket.
)         # End of lookahead assertion.

/**
 * Replace tags
 */
 html.replace(/<[^>]+>/gi, '');