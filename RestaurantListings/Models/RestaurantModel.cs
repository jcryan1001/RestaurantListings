using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using RestaurantListings.Data.Entities;

namespace RestaurantListings.Models
{
    public class RestaurantModel
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(200)]
        public string Address { get; set; }

        [Required]
        [MaxLength(20)]
        public string PhoneNumber { get; set; }

        [MaxLength(200)]
        public string Description { get; set; }

        public bool FamilyFriendly { get; set; }

        public bool VeganFriendly { get; set; }

        public List<string> Tags { get; set; } = new();

        public Restaurant ToEntity() => new()
        {
            Name = Name,
            Address = Address,
            PhoneNumber = PhoneNumber,
            Description = Description,
            VeganFriendly = VeganFriendly,
            FamilyFriendly = FamilyFriendly,
            Tags = Tags,
        };
    }
}
