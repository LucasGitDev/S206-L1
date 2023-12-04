package aula_inatel.json_placeholder;

import com.intuit.karate.junit5.Karate;

class JsonPlaceholderRunner {
    
    @Karate.Test
    Karate testStarWars() {
        return Karate.run("json_placeholder").relativeTo(getClass());
    }    

}