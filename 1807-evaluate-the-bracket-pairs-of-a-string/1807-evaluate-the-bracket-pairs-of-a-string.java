class Solution {
    public String evaluate(String s, List<List<String>> knowledge) {
        int n = s.length();
        
        int i = 0;
        Map<String, String> map = new HashMap<>();

        for (i=0; i < knowledge.size(); i++) {
            map.put(knowledge.get(i).get(0), knowledge.get(i).get(1));
        }

        i=0;
        StringBuilder sb = new StringBuilder();

        while (i < n) {
            if (s.charAt(i) == '(') {
                int st = i;
                while (i < n && s.charAt(i) != ')') {
                    i++;
                }
                sb.append(map.getOrDefault(s.substring(st+1, i), "?"));
            } else {
                sb.append(s.charAt(i));
            }
            i++;
        }

        return sb.toString();
    }
}