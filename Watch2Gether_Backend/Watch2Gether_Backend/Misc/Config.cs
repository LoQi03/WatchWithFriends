using Newtonsoft.Json;
using JsonIgnore = System.Text.Json.Serialization;

namespace Watch2Gether_Backend.Misc
{
    public class JwtConfig
    {
        public string? Issuer { get; set; }
        public string? Audience { get; set; }
        public string? Key { get; set; }
    }

    public class Config
    {

        [JsonProperty("Jwt")]
        public JwtConfig? Jwt { get; set; }

        [JsonIgnore]
        public static Config Instance { get; set; }
    }
}
