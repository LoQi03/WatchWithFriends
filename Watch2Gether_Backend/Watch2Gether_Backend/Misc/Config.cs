using Newtonsoft.Json;
using JsonIgnore = System.Text.Json.Serialization;

namespace WatchWithFriends.Misc
{
    public class JwtConfig
    {
        public required string Issuer { get; set; }
        public required string Audience { get; set; }
        public required string Key { get; set; }
    }

    public class Config
    {

        [JsonProperty("Jwt")]
        public JwtConfig Jwt { get; set; }

        [JsonProperty("ExpiresDay")]
        public int ExpiresDay { get; set; }

        [JsonIgnore]
        public static Config Instance { get; set; }
    }
}
