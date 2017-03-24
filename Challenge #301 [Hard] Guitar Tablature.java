// https://www.reddit.com/r/dailyprogrammer/comments/5rt1cj/20170203_challenge_301_hard_guitar_tablature/ddgj1o4/

static List<String> notes = Arrays.asList("C","C#","D","D#","E","F","F#","G","G#","A","A#","B");
public static void main(String[] args) throws IOException{
    char[][] map = Files.lines(Paths.get("input")).map(String::toCharArray).toArray(char[][]::new);
    for(int x = 2; x < map[0].length; x++)
        for(int y = 0; y < map.length; y++)
            if(Character.isDigit(map[y][x])){
                int value = map[y][x]-'0';
                while(Character.isDigit(map[y][x+1]))
                    value = value * 10 + (map[y][++x]-'0');
                value += notes.indexOf(Character.toString(map[y][0]));
                System.out.println(notes.get(value%12)+((12-y)/3+(value/12)));
            }
}