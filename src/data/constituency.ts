// export interface Constituency {
//   constituency_id: number;
//   name: string;
// }

// export interface District {
//   district_id: number;
//   district_name: string;
//   constituencies: Constituency[];
// }

// export interface TamilNaduConstituencies {
//   tamil_nadu_assembly_constituencies: District[];
// }

// const constituencyData: TamilNaduConstituencies = {
//   "tamil_nadu_assembly_constituencies": [
//     {
//       "district_id": 1,
//       "district_name": "Thiruvallur",
//       "constituencies": [
//         {"constituency_id": 1, "name": "Gummidipoondi"},
//         {"constituency_id": 2, "name": "Ponneri"},
//         {"constituency_id": 3, "name": "Tiruttani"},
//         {"constituency_id": 4, "name": "Thiruvallur"},
//         {"constituency_id": 5, "name": "Poonamallee"},
//         {"constituency_id": 6, "name": "Avadi"},
//         {"constituency_id": 9, "name": "Madhavaram"}
//       ]
//     },
//     {
//       "district_id": 2,
//       "district_name": "Chennai",
//       "constituencies": [
//         {"constituency_id": 7, "name": "Maduravoyal"},
//         {"constituency_id": 8, "name": "Ambattur"},
//         {"constituency_id": 10, "name": "Thiruvottiyur"},
//         {"constituency_id": 11, "name": "Dr. Radhakrishnan Nagar"},
//         {"constituency_id": 12, "name": "Perambur"},
//         {"constituency_id": 13, "name": "Kolathur"},
//         {"constituency_id": 14, "name": "Villivakkam"},
//         {"constituency_id": 15, "name": "Thiru-Vi-Ka-Nagar"},
//         {"constituency_id": 16, "name": "Egmore"},
//         {"constituency_id": 17, "name": "Royapuram"},
//         {"constituency_id": 18, "name": "Harbour"},
//         {"constituency_id": 19, "name": "Chepauk-Thiruvallikeni"},
//         {"constituency_id": 20, "name": "Thousand Lights"},
//         {"constituency_id": 21, "name": "Anna Nagar"},
//         {"constituency_id": 22, "name": "Virugambakkam"},
//         {"constituency_id": 23, "name": "Saidapet"},
//         {"constituency_id": 24, "name": "Thiyagarayanagar"},
//         {"constituency_id": 25, "name": "Mylapore"},
//         {"constituency_id": 26, "name": "Velachery"},
//         {"constituency_id": 27, "name": "Shozhinganallur"},
//         {"constituency_id": 28, "name": "Alandur"}
//       ]
//     },
//     {
//       "district_id": 3,
//       "district_name": "Kancheepuram",
//       "constituencies": [
//         {"constituency_id": 29, "name": "Sriperumbudur"},
//         {"constituency_id": 30, "name": "Pallavaram"},
//         {"constituency_id": 31, "name": "Tambaram"},
//         {"constituency_id": 32, "name": "Chengalpattu"},
//         {"constituency_id": 33, "name": "Thiruporur"},
//         {"constituency_id": 34, "name": "Cheyyur"},
//         {"constituency_id": 35, "name": "Madurantakam"},
//         {"constituency_id": 36, "name": "Uthiramerur"},
//         {"constituency_id": 37, "name": "Kancheepuram"}
//       ]
//     },
//     {
//       "district_id": 4,
//       "district_name": "Vellore",
//       "constituencies": [
//         {"constituency_id": 38, "name": "Arakkonam"},
//         {"constituency_id": 39, "name": "Sholinghur"},
//         {"constituency_id": 40, "name": "Katpadi"},
//         {"constituency_id": 43, "name": "Vellore"},
//         {"constituency_id": 44, "name": "Anaikattu"},
//         {"constituency_id": 45, "name": "Kilvaithinankuppam"},
//         {"constituency_id": 46, "name": "Gudiyattam"},
//         {"constituency_id": 47, "name": "Vaniyambadi"},
//         {"constituency_id": 48, "name": "Ambur"}
//       ]
//     },
//     {
//       "district_id": 5,
//       "district_name": "Krishnagiri",
//       "constituencies": [
//         {"constituency_id": 51, "name": "Uthangarai"},
//         {"constituency_id": 52, "name": "Bargur"},
//         {"constituency_id": 53, "name": "Krishnagiri"},
//         {"constituency_id": 54, "name": "Veppanahalli"},
//         {"constituency_id": 55, "name": "Hosur"},
//         {"constituency_id": 56, "name": "Thalli"}
//       ]
//     },
//     {
//       "district_id": 6,
//       "district_name": "Dharmapuri",
//       "constituencies": [
//         {"constituency_id": 57, "name": "Palacode"},
//         {"constituency_id": 58, "name": "Pennagaram"},
//         {"constituency_id": 59, "name": "Dharmapuri"},
//         {"constituency_id": 60, "name": "Pappireddippatti"},
//         {"constituency_id": 61, "name": "Harur"}
//       ]
//     },
//     {
//       "district_id": 7,
//       "district_name": "Tiruvannamalai",
//       "constituencies": [
//         {"constituency_id": 62, "name": "Chengam"},
//         {"constituency_id": 63, "name": "Tiruvannamalai"},
//         {"constituency_id": 64, "name": "Kilpennathur"},
//         {"constituency_id": 65, "name": "Kalasapakkam"},
//         {"constituency_id": 66, "name": "Polur"},
//         {"constituency_id": 67, "name": "Arani"},
//         {"constituency_id": 68, "name": "Cheyyar"},
//         {"constituency_id": 69, "name": "Vandavasi"}
//       ]
//     },
//     {
//       "district_id": 8,
//       "district_name": "Viluppuram",
//       "constituencies": [
//         {"constituency_id": 70, "name": "Gingee"},
//         {"constituency_id": 71, "name": "Mailam"},
//         {"constituency_id": 72, "name": "Tindivanam"},
//         {"constituency_id": 73, "name": "Vanur"},
//         {"constituency_id": 74, "name": "Villupuram"},
//         {"constituency_id": 75, "name": "Vikravandi"}
//       ]
//     },
//     {
//       "district_id": 9,
//       "district_name": "Salem",
//       "constituencies": [
//         {"constituency_id": 81, "name": "Gangavalli"},
//         {"constituency_id": 82, "name": "Attur"},
//         {"constituency_id": 83, "name": "Yercaud"},
//         {"constituency_id": 84, "name": "Omalur"},
//         {"constituency_id": 85, "name": "Mettur"},
//         {"constituency_id": 86, "name": "Edappadi"},
//         {"constituency_id": 87, "name": "Sankari"},
//         {"constituency_id": 88, "name": "Salem (West)"},
//         {"constituency_id": 89, "name": "Salem (North)"},
//         {"constituency_id": 90, "name": "Salem (South)"},
//         {"constituency_id": 91, "name": "Veerapandi"}
//       ]
//     },
//     {
//       "district_id": 10,
//       "district_name": "Namakkal",
//       "constituencies": [
//         {"constituency_id": 92, "name": "Rasipuram"},
//         {"constituency_id": 93, "name": "Senthamangalam"},
//         {"constituency_id": 94, "name": "Namakkal"},
//         {"constituency_id": 95, "name": "Paramathi Velur"},
//         {"constituency_id": 96, "name": "Tiruchengodu"}
//       ]
//     },
//     {
//       "district_id": 11,
//       "district_name": "Erode",
//       "constituencies": [
//         {"constituency_id": 97, "name": "Kumarapalayam"},
//         {"constituency_id": 98, "name": "Erode (East)"},
//         {"constituency_id": 99, "name": "Erode (West)"},
//         {"constituency_id": 100, "name": "Modakkurichi"},
//         {"constituency_id": 103, "name": "Perundurai"},
//         {"constituency_id": 104, "name": "Bhavani"},
//         {"constituency_id": 105, "name": "Anthiyur"},
//         {"constituency_id": 106, "name": "Gobichettipalayam"}
//       ]
//     },
//     {
//       "district_id": 12,
//       "district_name": "Tiruppur",
//       "constituencies": [
//         {"constituency_id": 101, "name": "Dharapuram"},
//         {"constituency_id": 102, "name": "Kangayam"},
//         {"constituency_id": 112, "name": "Avanashi"},
//         {"constituency_id": 113, "name": "Tiruppur (North)"},
//         {"constituency_id": 114, "name": "Tiruppur (South)"},
//         {"constituency_id": 125, "name": "Udumalaipettai"}
//       ]
//     },
//     {
//       "district_id": 13,
//       "district_name": "Coimbatore",
//       "constituencies": [
//         {"constituency_id": 111, "name": "Mettupalayam"},
//         {"constituency_id": 115, "name": "Palladam"},
//         {"constituency_id": 116, "name": "Sulur"},
//         {"constituency_id": 117, "name": "Kavundampalayam"},
//         {"constituency_id": 118, "name": "Coimbatore (North)"},
//         {"constituency_id": 119, "name": "Thondamuthur"},
//         {"constituency_id": 120, "name": "Coimbatore (South)"},
//         {"constituency_id": 121, "name": "Singanallur"},
//         {"constituency_id": 122, "name": "Kinathukadavu"},
//         {"constituency_id": 123, "name": "Pollachi"},
//         {"constituency_id": 124, "name": "Valparai"}
//       ]
//     },
//     {
//       "district_id": 14,
//       "district_name": "Nilgiris",
//       "constituencies": [
//         {"constituency_id": 107, "name": "Bhavanisagar"},
//         {"constituency_id": 108, "name": "Udhagamandalam"},
//         {"constituency_id": 109, "name": "Gudalur"},
//         {"constituency_id": 110, "name": "Coonoor"}
//       ]
//     },
//     {
//       "district_id": 15,
//       "district_name": "Dindigul",
//       "constituencies": [
//         {"constituency_id": 127, "name": "Palani"},
//         {"constituency_id": 128, "name": "Oddanchatram"},
//         {"constituency_id": 129, "name": "Athoor"},
//         {"constituency_id": 130, "name": "Nilakottai"},
//         {"constituency_id": 131, "name": "Natham"},
//         {"constituency_id": 132, "name": "Dindigul"}
//       ]
//     },
//     {
//       "district_id": 16,
//       "district_name": "Karur",
//       "constituencies": [
//         {"constituency_id": 133, "name": "Vedasandur"},
//         {"constituency_id": 134, "name": "Aravakurichi"},
//         {"constituency_id": 135, "name": "Karur"},
//         {"constituency_id": 136, "name": "Krishnarayapuram"}
//       ]
//     },
//     {
//       "district_id": 17,
//       "district_name": "Tiruchirappalli",
//       "constituencies": [
//         {"constituency_id": 137, "name": "Kulithalai"},
//         {"constituency_id": 138, "name": "Manapaarai"},
//         {"constituency_id": 139, "name": "Srirangam"},
//         {"constituency_id": 140, "name": "Tiruchirappalli (West)"},
//         {"constituency_id": 141, "name": "Tiruchirappalli (East)"},
//         {"constituency_id": 142, "name": "Thiruverumbur"},
//         {"constituency_id": 143, "name": "Lalgudi"},
//         {"constituency_id": 144, "name": "Manachanallur"},
//         {"constituency_id": 145, "name": "Musiri"},
//         {"constituency_id": 146, "name": "Thuraiyur"}
//       ]
//     },
//     {
//       "district_id": 18,
//       "district_name": "Perambalur",
//       "constituencies": [
//         {"constituency_id": 147, "name": "Perambalur"},
//         {"constituency_id": 148, "name": "Kunnam"}
//       ]
//     },
//     {
//       "district_id": 19,
//       "district_name": "Ariyalur",
//       "constituencies": [
//         {"constituency_id": 149, "name": "Ariyalur"},
//         {"constituency_id": 150, "name": "Jayankondam"}
//       ]
//     },
//     {
//       "district_id": 20,
//       "district_name": "Cuddalore",
//       "constituencies": [
//         {"constituency_id": 151, "name": "Tittakudi"},
//         {"constituency_id": 152, "name": "Virudhachalam"},
//         {"constituency_id": 153, "name": "Neyveli"},
//         {"constituency_id": 154, "name": "Panruti"},
//         {"constituency_id": 155, "name": "Cuddalore"},
//         {"constituency_id": 156, "name": "Kurinjipadi"},
//         {"constituency_id": 157, "name": "Bhuvanagiri"},
//         {"constituency_id": 158, "name": "Chidambaram"},
//         {"constituency_id": 159, "name": "Kattumannarkoil"}
//       ]
//     },
//     {
//       "district_id": 21,
//       "district_name": "Nagapattinam",
//       "constituencies": [
//         {"constituency_id": 160, "name": "Sirkazhi"},
//         {"constituency_id": 161, "name": "Mayiladuthurai"},
//         {"constituency_id": 162, "name": "Poompuhar"},
//         {"constituency_id": 163, "name": "Nagapattinam"},
//         {"constituency_id": 164, "name": "Kilvelur"},
//         {"constituency_id": 165, "name": "Vedaranyam"}
//       ]
//     },
//     {
//       "district_id": 22,
//       "district_name": "Thiruvarur",
//       "constituencies": [
//         {"constituency_id": 166, "name": "Thiruvarur"},
//         {"constituency_id": 167, "name": "Nannilam"},
//         {"constituency_id": 168, "name": "Kodavasal"},
//         {"constituency_id": 169, "name": "Valangaiman"},
//         {"constituency_id": 170, "name": "Mannargudi"},
//         {"constituency_id": 171, "name": "Thiruthuraipoondi"}
//       ]
//     },
//     {
//       "district_id": 23,
//       "district_name": "Thanjavur",
//       "constituencies": [
//         {"constituency_id": 172, "name": "Thanjavur"},
//         {"constituency_id": 173, "name": "Orathanadu"},
//         {"constituency_id": 174, "name": "Pattukkottai"},
//         {"constituency_id": 175, "name": "Peravurani"},
//         {"constituency_id": 176, "name": "Gandharvakottai"},
//         {"constituency_id": 177, "name": "Viralimalai"}
//       ]
//     },
//     {
//       "district_id": 24,
//       "district_name": "Pudukkottai",
//       "constituencies": [
//         {"constituency_id": 178, "name": "Pudukkottai"},
//         {"constituency_id": 179, "name": "Thirumayam"},
//         {"constituency_id": 180, "name": "Alangudi"},
//         {"constituency_id": 181, "name": "Aranthangi"},
//         {"constituency_id": 182, "name": "Karaikudi"}
//       ]
//     },
//     {
//       "district_id": 25,
//       "district_name": "Sivaganga",
//       "constituencies": [
//         {"constituency_id": 183, "name": "Tirupattur"},
//         {"constituency_id": 184, "name": "Karaikudi"},
//         {"constituency_id": 185, "name": "Tiruppathur"},
//         {"constituency_id": 186, "name": "Sivagangai"},
//         {"constituency_id": 187, "name": "Manamadurai"}
//       ]
//     },
//     {
//       "district_id": 26,
//       "district_name": "Madurai",
//       "constituencies": [
//         {"constituency_id": 188, "name": "Melur"},
//         {"constituency_id": 189, "name": "Madurai East"},
//         {"constituency_id": 190, "name": "Sholavandan"},
//         {"constituency_id": 191, "name": "Madurai North"},
//         {"constituency_id": 192, "name": "Madurai South"},
//         {"constituency_id": 193, "name": "Madurai Central"},
//         {"constituency_id": 194, "name": "Madurai West"},
//         {"constituency_id": 195, "name": "Thiruparankundram"},
//         {"constituency_id": 196, "name": "Thirumangalam"},
//         {"constituency_id": 197, "name": "Usilampatti"}
//       ]
//     },
//     {
//       "district_id": 27,
//       "district_name": "Theni",
//       "constituencies": [
//         {"constituency_id": 198, "name": "Andipatti"},
//         {"constituency_id": 199, "name": "Periyakulam"},
//         {"constituency_id": 200, "name": "Bodinayakkanur"},
//         {"constituency_id": 201, "name": "Cumbum"},
//         {"constituency_id": 202, "name": "Theni"}
//       ]
//     },
//     {
//       "district_id": 28,
//       "district_name": "Virudhunagar",
//       "constituencies": [
//         {"constituency_id": 203, "name": "Rajapalayam"},
//         {"constituency_id": 204, "name": "Srivilliputhur"},
//         {"constituency_id": 205, "name": "Sattur"},
//         {"constituency_id": 206, "name": "Sivakasi"},
//         {"constituency_id": 207, "name": "Virudhunagar"},
//         {"constituency_id": 208, "name": "Aruppukkottai"},
//         {"constituency_id": 209, "name": "Tiruchuli"}
//       ]
//     },
//     {
//       "district_id": 29,
//       "district_name": "Ramanathapuram",
//       "constituencies": [
//         {"constituency_id": 210, "name": "Paramakudi"},
//         {"constituency_id": 211, "name": "Tiruvadanai"},
//         {"constituency_id": 212, "name": "Ramanathapuram"},
//         {"constituency_id": 213, "name": "Mudukulathur"},
//         {"constituency_id": 214, "name": "Vilathikulam"}
//       ]
//     },
//     {
//       "district_id": 30,
//       "district_name": "Thoothukudi",
//       "constituencies": [
//         {"constituency_id": 215, "name": "Thoothukudi"},
//         {"constituency_id": 216, "name": "Tiruchendur"},
//         {"constituency_id": 217, "name": "Srivaikuntam"},
//         {"constituency_id": 218, "name": "Ottapidaram"},
//         {"constituency_id": 219, "name": "Kovilpatti"}
//       ]
//     },
//     {
//       "district_id": 31,
//       "district_name": "Tirunelveli",
//       "constituencies": [
//         {"constituency_id": 220, "name": "Sankarankovil"},
//         {"constituency_id": 221, "name": "Vasudevanallur"},
//         {"constituency_id": 222, "name": "Kadayanallur"},
//         {"constituency_id": 223, "name": "Tenkasi"},
//         {"constituency_id": 224, "name": "Alangulam"},
//         {"constituency_id": 225, "name": "Tirunelveli"},
//         {"constituency_id": 226, "name": "Ambasamudram"},
//         {"constituency_id": 227, "name": "Palayamkottai"},
//         {"constituency_id": 228, "name": "Nanguneri"}
//       ]
//     },
//     {
//       "district_id": 32,
//       "district_name": "Kanniyakumari",
//       "constituencies": [
//         {"constituency_id": 229, "name": "Kanniyakumari"},
//         {"constituency_id": 230, "name": "Nagercoil"},
//         {"constituency_id": 231, "name": "Colachel"},
//         {"constituency_id": 232, "name": "Padmanabhapuram"},
//         {"constituency_id": 233, "name": "Vilavancode"},
//         {"constituency_id": 234, "name": "Killiyoor"}
//       ]
//     },
//     {
//       "district_id": 33,
//       "district_name": "Ranipet",
//       "constituencies": [
//         {"constituency_id": 41, "name": "Ranipet"},
//         {"constituency_id": 42, "name": "Arcot"}
//       ]
//     },
//     {
//       "district_id": 34,
//       "district_name": "Tirupattur",
//       "constituencies": [
//         {"constituency_id": 49, "name": "Jolarpet"},
//         {"constituency_id": 50, "name": "Tirupattur"}
//       ]
//     },
//     {
//       "district_id": 35,
//       "district_name": "Kallakurichi",
//       "constituencies": [
//         {"constituency_id": 76, "name": "Tirukkoyilur"},
//         {"constituency_id": 77, "name": "Ulundurpettai"},
//         {"constituency_id": 78, "name": "Rishivandiyam"},
//         {"constituency_id": 79, "name": "Sankarapuram"},
//         {"constituency_id": 80, "name": "Kallakurichi"}
//       ]
//     },
//     {
//       "district_id": 36,
//       "district_name": "Chengalpattu",
//       "constituencies": [
//         {"constituency_id": 30, "name": "Pallavaram"},
//         {"constituency_id": 31, "name": "Tambaram"},
//         {"constituency_id": 32, "name": "Chengalpattu"},
//         {"constituency_id": 33, "name": "Thiruporur"},
//         {"constituency_id": 34, "name": "Cheyyur"},
//         {"constituency_id": 35, "name": "Madurantakam"}
//       ]
//     },
//     {
//       "district_id": 37,
//       "district_name": "Tenkasi",
//       "constituencies": [
//         {"constituency_id": 223, "name": "Tenkasi"},
//         {"constituency_id": 224, "name": "Alangulam"}
//       ]
//     },
//     {
//       "district_id": 38,
//       "district_name": "Mayiladuthurai",
//       "constituencies": [
//         {"constituency_id": 161, "name": "Mayiladuthurai"},
//         {"constituency_id": 162, "name": "Poompuhar"}
//       ]
//     }
//   ]
// };

// export default constituencyData;


export interface Constituency {
  constituency_id: number;
  name: string;
  complianceCount: number;
  issueCount: number;
  improvementNeeded: string;
  improvementCount: number;
  phoneCallCount: number;
  positiveFeedbackPercent?: number;
  negativeFeedbackPercent?: number;
}

export interface District {
  district_id: number;
  district_name: string;
  constituencies: Constituency[];
}

export interface TamilNaduConstituencies {
  tamil_nadu_assembly_constituencies: District[];
}

const constituencyData: TamilNaduConstituencies = {
  tamil_nadu_assembly_constituencies: [
    {
      district_id: 1,
      district_name: "Thiruvallur",
      constituencies: [
        { 
          constituency_id: 1, 
          name: "Gummidipoondi",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Infrastructure",
          improvementCount: 12,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        { 
          constituency_id: 2, 
          name: "Ponneri",
          complianceCount: 78,
          issueCount: 22,
          improvementNeeded: "Education",
          improvementCount: 18,
          phoneCallCount: 95,
          positiveFeedbackPercent: 65,
          negativeFeedbackPercent: 35
        },
        {
          constituency_id: 3,
          name: "Tiruttani",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Healthcare",
          improvementCount: 15,
          phoneCallCount: 110,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 4,
          name: "Thiruvallur",
          complianceCount: 88,
          issueCount: 12,
          improvementNeeded: "Transport",
          improvementCount: 10,
          phoneCallCount: 130,
          positiveFeedbackPercent: 75,
          negativeFeedbackPercent: 25
        },
        {
          constituency_id: 5,
          name: "Poonamallee",
          complianceCount: 80,
          issueCount: 20,
          improvementNeeded: "Sanitation",
          improvementCount: 16,
          phoneCallCount: 105,
          positiveFeedbackPercent: 68,
          negativeFeedbackPercent: 32
        },
        {
          constituency_id: 6,
          name: "Avadi",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Water Supply",
          improvementCount: 14,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 9,
          name: "Madhavaram",
          complianceCount: 87,
          issueCount: 13,
          improvementNeeded: "Roads",
          improvementCount: 11,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        }
      ]
    },
    {
      district_id: 2,
      district_name: "Chennai",
      constituencies: [
        {
          constituency_id: 7,
          name: "Maduravoyal",
          complianceCount: 90,
          issueCount: 10,
          improvementNeeded: "Traffic",
          improvementCount: 8,
          phoneCallCount: 140,
          positiveFeedbackPercent: 80,
          negativeFeedbackPercent: 20
        },
        {
          constituency_id: 8,
          name: "Ambattur",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Pollution",
          improvementCount: 12,
          phoneCallCount: 130,
          positiveFeedbackPercent: 75,
          negativeFeedbackPercent: 25
        },
        {
          constituency_id: 10,
          name: "Thiruvottiyur",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Housing",
          improvementCount: 15,
          phoneCallCount: 120,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 11,
          name: "Dr. Radhakrishnan Nagar",
          complianceCount: 88,
          issueCount: 12,
          improvementNeeded: "Parks",
          improvementCount: 10,
          phoneCallCount: 135,
          positiveFeedbackPercent: 78,
          negativeFeedbackPercent: 22
        },
        {
          constituency_id: 12,
          name: "Perambur",
          complianceCount: 80,
          issueCount: 20,
          improvementNeeded: "Drainage",
          improvementCount: 16,
          phoneCallCount: 110,
          positiveFeedbackPercent: 68,
          negativeFeedbackPercent: 32
        },
        {
          constituency_id: 13,
          name: "Kolathur",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Electricity",
          improvementCount: 14,
          phoneCallCount: 115,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 14,
          name: "Villivakkam",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Waste Management",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        },
        {
          constituency_id: 15,
          name: "Thiru-Vi-Ka-Nagar",
          complianceCount: 87,
          issueCount: 13,
          improvementNeeded: "Public Transport",
          improvementCount: 11,
          phoneCallCount: 130,
          positiveFeedbackPercent: 76,
          negativeFeedbackPercent: 24
        },
        {
          constituency_id: 16,
          name: "Egmore",
          complianceCount: 89,
          issueCount: 11,
          improvementNeeded: "Heritage Conservation",
          improvementCount: 9,
          phoneCallCount: 140,
          positiveFeedbackPercent: 79,
          negativeFeedbackPercent: 21
        },
        {
          constituency_id: 17,
          name: "Royapuram",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Fisheries",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 18,
          name: "Harbour",
          complianceCount: 86,
          issueCount: 14,
          improvementNeeded: "Port Infrastructure",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 75,
          negativeFeedbackPercent: 25
        },
        {
          constituency_id: 19,
          name: "Chepauk-Thiruvallikeni",
          complianceCount: 88,
          issueCount: 12,
          improvementNeeded: "Tourism",
          improvementCount: 10,
          phoneCallCount: 135,
          positiveFeedbackPercent: 77,
          negativeFeedbackPercent: 23
        },
        {
          constituency_id: 20,
          name: "Thousand Lights",
          complianceCount: 90,
          issueCount: 10,
          improvementNeeded: "Cultural Events",
          improvementCount: 8,
          phoneCallCount: 140,
          positiveFeedbackPercent: 80,
          negativeFeedbackPercent: 20
        },
        {
          constituency_id: 21,
          name: "Anna Nagar",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Green Spaces",
          improvementCount: 12,
          phoneCallCount: 130,
          positiveFeedbackPercent: 75,
          negativeFeedbackPercent: 25
        },
        {
          constituency_id: 22,
          name: "Virugambakkam",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Commercial Regulation",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 23,
          name: "Saidapet",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Slum Development",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 24,
          name: "Thiyagarayanagar",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Education",
          improvementCount: 13,
          phoneCallCount: 125,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 25,
          name: "Mylapore",
          complianceCount: 89,
          issueCount: 11,
          improvementNeeded: "Temple Maintenance",
          improvementCount: 9,
          phoneCallCount: 140,
          positiveFeedbackPercent: 78,
          negativeFeedbackPercent: 22
        },
        {
          constituency_id: 26,
          name: "Velachery",
          complianceCount: 86,
          issueCount: 14,
          improvementNeeded: "IT Infrastructure",
          improvementCount: 12,
          phoneCallCount: 130,
          positiveFeedbackPercent: 75,
          negativeFeedbackPercent: 25
        },
        {
          constituency_id: 27,
          name: "Shozhinganallur",
          complianceCount: 87,
          issueCount: 13,
          improvementNeeded: "Startup Support",
          improvementCount: 11,
          phoneCallCount: 135,
          positiveFeedbackPercent: 76,
          negativeFeedbackPercent: 24
        },
        {
          constituency_id: 28,
          name: "Alandur",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Metro Connectivity",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        }
      ]
    },
    {
      district_id: 3,
      district_name: "Kancheepuram",
      constituencies: [
        {
          constituency_id: 29,
          name: "Sriperumbudur",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Industrial Development",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 30,
          name: "Pallavaram",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Airport Services",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 31,
          name: "Tambaram",
          complianceCount: 86,
          issueCount: 14,
          improvementNeeded: "Railway Services",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 75,
          negativeFeedbackPercent: 25
        },
        {
          constituency_id: 32,
          name: "Chengalpattu",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Water Resources",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 33,
          name: "Thiruporur",
          complianceCount: 80,
          issueCount: 20,
          improvementNeeded: "Agriculture",
          improvementCount: 16,
          phoneCallCount: 110,
          positiveFeedbackPercent: 68,
          negativeFeedbackPercent: 32
        },
        {
          constituency_id: 34,
          name: "Cheyyur",
          complianceCount: 79,
          issueCount: 21,
          improvementNeeded: "Fisheries",
          improvementCount: 17,
          phoneCallCount: 105,
          positiveFeedbackPercent: 67,
          negativeFeedbackPercent: 33
        },
        {
          constituency_id: 35,
          name: "Madurantakam",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Lakes Restoration",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 36,
          name: "Uthiramerur",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Rural Development",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 37,
          name: "Kancheepuram",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Silk Industry",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        }
      ]
    },
    // Continuing with all 38 districts...
    // District 4 - Vellore
    {
      district_id: 4,
      district_name: "Vellore",
      constituencies: [
        {
          constituency_id: 38,
          name: "Arakkonam",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Railway Infrastructure",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 39,
          name: "Sholinghur",
          complianceCount: 80,
          issueCount: 20,
          improvementNeeded: "Temple Tourism",
          improvementCount: 16,
          phoneCallCount: 110,
          positiveFeedbackPercent: 69,
          negativeFeedbackPercent: 31
        },
        {
          constituency_id: 40,
          name: "Katpadi",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Medical Tourism",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        },
        {
          constituency_id: 43,
          name: "Vellore",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Heritage Conservation",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 44,
          name: "Anaikattu",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 45,
          name: "Kilvaithinankuppam",
          complianceCount: 79,
          issueCount: 21,
          improvementNeeded: "Water Supply",
          improvementCount: 17,
          phoneCallCount: 105,
          positiveFeedbackPercent: 68,
          negativeFeedbackPercent: 32
        },
        {
          constituency_id: 46,
          name: "Gudiyattam",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Rural Industries",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 47,
          name: "Vaniyambadi",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Leather Industry",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 48,
          name: "Ambur",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Tanning Industry",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        }
      ]
    },
    // District 5 - Krishnagiri
    {
      district_id: 5,
      district_name: "Krishnagiri",
      constituencies: [
        {
          constituency_id: 51,
          name: "Uthangarai",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 52,
          name: "Bargur",
          complianceCount: 80,
          issueCount: 20,
          improvementNeeded: "Animal Husbandry",
          improvementCount: 16,
          phoneCallCount: 110,
          positiveFeedbackPercent: 69,
          negativeFeedbackPercent: 31
        },
        {
          constituency_id: 53,
          name: "Krishnagiri",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Horticulture",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 54,
          name: "Veppanahalli",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Dairy Development",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 55,
          name: "Hosur",
          complianceCount: 86,
          issueCount: 14,
          improvementNeeded: "Industrial Growth",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 75,
          negativeFeedbackPercent: 25
        },
        {
          constituency_id: 56,
          name: "Thalli",
          complianceCount: 79,
          issueCount: 21,
          improvementNeeded: "Tribal Welfare",
          improvementCount: 17,
          phoneCallCount: 105,
          positiveFeedbackPercent: 68,
          negativeFeedbackPercent: 32
        }
      ]
    },
        {
      district_id: 6,
      district_name: "Dharmapuri",
      constituencies: [
        {
          constituency_id: 57,
          name: "Palacode",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 110,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 58,
          name: "Pennagaram",
          complianceCount: 79,
          issueCount: 21,
          improvementNeeded: "Water Resources",
          improvementCount: 17,
          phoneCallCount: 105,
          positiveFeedbackPercent: 68,
          negativeFeedbackPercent: 32
        },
        {
          constituency_id: 59,
          name: "Dharmapuri",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Education",
          improvementCount: 14,
          phoneCallCount: 115,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 60,
          name: "Pappireddippatti",
          complianceCount: 80,
          issueCount: 20,
          improvementNeeded: "Healthcare",
          improvementCount: 16,
          phoneCallCount: 110,
          positiveFeedbackPercent: 69,
          negativeFeedbackPercent: 31
        },
        {
          constituency_id: 61,
          name: "Harur",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Rural Development",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        }
      ]
    },
    {
      district_id: 7,
      district_name: "Tiruvannamalai",
      constituencies: [
        {
          constituency_id: 62,
          name: "Chengam",
          complianceCount: 80,
          issueCount: 20,
          improvementNeeded: "Agriculture",
          improvementCount: 16,
          phoneCallCount: 110,
          positiveFeedbackPercent: 69,
          negativeFeedbackPercent: 31
        },
        {
          constituency_id: 63,
          name: "Tiruvannamalai",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Temple Infrastructure",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 64,
          name: "Kilpennathur",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Water Resources",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 65,
          name: "Kalasapakkam",
          complianceCount: 79,
          issueCount: 21,
          improvementNeeded: "Rural Roads",
          improvementCount: 17,
          phoneCallCount: 105,
          positiveFeedbackPercent: 68,
          negativeFeedbackPercent: 32
        },
        {
          constituency_id: 66,
          name: "Polur",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Education",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 67,
          name: "Arani",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Silk Industry",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 68,
          name: "Cheyyar",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Industrial Growth",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        },
        {
          constituency_id: 69,
          name: "Vandavasi",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Tourism",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        }
      ]
    },
    {
      district_id: 8,
      district_name: "Viluppuram",
      constituencies: [
        {
          constituency_id: 70,
          name: "Gingee",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Fort Conservation",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 71,
          name: "Mailam",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Education",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 72,
          name: "Tindivanam",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Transport",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 73,
          name: "Vanur",
          complianceCount: 80,
          issueCount: 20,
          improvementNeeded: "Agriculture",
          improvementCount: 16,
          phoneCallCount: 110,
          positiveFeedbackPercent: 69,
          negativeFeedbackPercent: 31
        },
        {
          constituency_id: 74,
          name: "Villupuram",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Urban Development",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 75,
          name: "Vikravandi",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Water Resources",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        }
      ]
    },
    {
      district_id: 9,
      district_name: "Salem",
      constituencies: [
        {
          constituency_id: 81,
          name: "Gangavalli",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 82,
          name: "Attur",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Industrial Growth",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 83,
          name: "Yercaud",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Tourism",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        },
        {
          constituency_id: 84,
          name: "Omalur",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Textile Industry",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 85,
          name: "Mettur",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Water Management",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 86,
          name: "Edappadi",
          complianceCount: 86,
          issueCount: 14,
          improvementNeeded: "Infrastructure",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 75,
          negativeFeedbackPercent: 25
        },
        {
          constituency_id: 87,
          name: "Sankari",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Education",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 88,
          name: "Salem (West)",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Urban Development",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        },
        {
          constituency_id: 89,
          name: "Salem (North)",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Public Transport",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 90,
          name: "Salem (South)",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Healthcare",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 91,
          name: "Veerapandi",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Industrial Growth",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        }
      ]
    },
    {
      district_id: 10,
      district_name: "Namakkal",
      constituencies: [
        {
          constituency_id: 92,
          name: "Rasipuram",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Agriculture",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 93,
          name: "Senthamangalam",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Education",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 94,
          name: "Namakkal",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Transport",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        },
        {
          constituency_id: 95,
          name: "Paramathi Velur",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Dairy Development",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 96,
          name: "Tiruchengodu",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Textile Industry",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        }
      ]
    },
     {
      district_id: 11,
      district_name: "Erode",
      constituencies: [
        {
          constituency_id: 97,
          name: "Kumarapalayam",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Textile Industry",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 98,
          name: "Erode (East)",
          complianceCount: 86,
          issueCount: 14,
          improvementNeeded: "Urban Development",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 75,
          negativeFeedbackPercent: 25
        },
        {
          constituency_id: 99,
          name: "Erode (West)",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Public Transport",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        },
        {
          constituency_id: 100,
          name: "Modakkurichi",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Agriculture",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 103,
          name: "Perundurai",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Industrial Growth",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 104,
          name: "Bhavani",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Water Resources",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 105,
          name: "Anthiyur",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Rural Development",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 106,
          name: "Gobichettipalayam",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Education",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        }
      ]
    },
    {
      district_id: 12,
      district_name: "Tiruppur",
      constituencies: [
        {
          constituency_id: 101,
          name: "Dharapuram",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 102,
          name: "Kangayam",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Dairy Development",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 112,
          name: "Avanashi",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Textile Industry",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        },
        {
          constituency_id: 113,
          name: "Tiruppur (North)",
          complianceCount: 86,
          issueCount: 14,
          improvementNeeded: "Export Infrastructure",
          improvementCount: 12,
          phoneCallCount: 130,
          positiveFeedbackPercent: 75,
          negativeFeedbackPercent: 25
        },
        {
          constituency_id: 114,
          name: "Tiruppur (South)",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Labor Welfare",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 125,
          name: "Udumalaipettai",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Tourism",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        }
      ]
    },
    {
      district_id: 13,
      district_name: "Coimbatore",
      constituencies: [
        {
          constituency_id: 111,
          name: "Mettupalayam",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Hill Area Development",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 115,
          name: "Palladam",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Textile Industry",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 116,
          name: "Sulur",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Aviation Sector",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        },
        {
          constituency_id: 117,
          name: "Kavundampalayam",
          complianceCount: 86,
          issueCount: 14,
          improvementNeeded: "Urban Infrastructure",
          improvementCount: 12,
          phoneCallCount: 130,
          positiveFeedbackPercent: 75,
          negativeFeedbackPercent: 25
        },
        {
          constituency_id: 118,
          name: "Coimbatore (North)",
          complianceCount: 87,
          issueCount: 13,
          improvementNeeded: "IT Sector",
          improvementCount: 11,
          phoneCallCount: 135,
          positiveFeedbackPercent: 76,
          negativeFeedbackPercent: 24
        },
        {
          constituency_id: 119,
          name: "Thondamuthur",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Water Resources",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 120,
          name: "Coimbatore (South)",
          complianceCount: 86,
          issueCount: 14,
          improvementNeeded: "Education",
          improvementCount: 12,
          phoneCallCount: 130,
          positiveFeedbackPercent: 75,
          negativeFeedbackPercent: 25
        },
        {
          constituency_id: 121,
          name: "Singanallur",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Industrial Growth",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        },
        {
          constituency_id: 122,
          name: "Kinathukadavu",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Agriculture",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 123,
          name: "Pollachi",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Eco-Tourism",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 124,
          name: "Valparai",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Forest Conservation",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        }
      ]
    },
    {
      district_id: 14,
      district_name: "Nilgiris",
      constituencies: [
        {
          constituency_id: 107,
          name: "Bhavanisagar",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Water Management",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 108,
          name: "Udhagamandalam",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Tourism",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        },
        {
          constituency_id: 109,
          name: "Gudalur",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Tribal Welfare",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 110,
          name: "Coonoor",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Tea Industry",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        }
      ]
    },
    {
      district_id: 15,
      district_name: "Dindigul",
      constituencies: [
        {
          constituency_id: 127,
          name: "Palani",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Temple Tourism",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 128,
          name: "Oddanchatram",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 129,
          name: "Athoor",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Education",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 130,
          name: "Nilakottai",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Handloom Industry",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 131,
          name: "Natham",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Rural Development",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 132,
          name: "Dindigul",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Urban Infrastructure",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        }
      ]
    },
    {
      district_id: 16,
      district_name: "Karur",
      constituencies: [
        {
          constituency_id: 133,
          name: "Vedasandur",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Handloom Industry",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 134,
          name: "Aravakurichi",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 135,
          name: "Karur",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Textile Industry",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 136,
          name: "Krishnarayapuram",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "River Conservation",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        }
      ]
    },
    {
      district_id: 17,
      district_name: "Tiruchirappalli",
      constituencies: [
        {
          constituency_id: 137,
          name: "Kulithalai",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 138,
          name: "Manapaarai",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Industrial Growth",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 139,
          name: "Srirangam",
          complianceCount: 86,
          issueCount: 14,
          improvementNeeded: "Temple Tourism",
          improvementCount: 12,
          phoneCallCount: 130,
          positiveFeedbackPercent: 75,
          negativeFeedbackPercent: 25
        },
        {
          constituency_id: 140,
          name: "Tiruchirappalli (West)",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Urban Development",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        },
        {
          constituency_id: 141,
          name: "Tiruchirappalli (East)",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Education",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 142,
          name: "Thiruverumbur",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Industrial Estate",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 143,
          name: "Lalgudi",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 144,
          name: "Manachanallur",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Rural Development",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 145,
          name: "Musiri",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "River Conservation",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 146,
          name: "Thuraiyur",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Forest Resources",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        }
      ]
    },
    {
      district_id: 18,
      district_name: "Perambalur",
      constituencies: [
        {
          constituency_id: 147,
          name: "Perambalur",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 148,
          name: "Kunnam",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Education",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        }
      ]
    },
    {
      district_id: 19,
      district_name: "Ariyalur",
      constituencies: [
        {
          constituency_id: 149,
          name: "Ariyalur",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Cement Industry",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 150,
          name: "Jayankondam",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        }
      ]
    },
    {
      district_id: 20,
      district_name: "Cuddalore",
      constituencies: [
        {
          constituency_id: 151,
          name: "Tittakudi",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 152,
          name: "Virudhachalam",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Education",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 153,
          name: "Neyveli",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Energy Sector",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        },
        {
          constituency_id: 154,
          name: "Panruti",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Cashew Industry",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 155,
          name: "Cuddalore",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Port Development",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 156,
          name: "Kurinjipadi",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 157,
          name: "Bhuvanagiri",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Tourism",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 158,
          name: "Chidambaram",
          complianceCount: 86,
          issueCount: 14,
          improvementNeeded: "Temple Tourism",
          improvementCount: 12,
          phoneCallCount: 130,
          positiveFeedbackPercent: 75,
          negativeFeedbackPercent: 25
        },
        {
          constituency_id: 159,
          name: "Kattumannarkoil",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Fisheries",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        }
      ]
    },
    {
      district_id: 21,
      district_name: "Nagapattinam",
      constituencies: [
        {
          constituency_id: 160,
          name: "Sirkazhi",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Temple Tourism",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 161,
          name: "Mayiladuthurai",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Cultural Heritage",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 162,
          name: "Poompuhar",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Coastal Development",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 163,
          name: "Nagapattinam",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Port Development",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 164,
          name: "Kilvelur",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 165,
          name: "Vedaranyam",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Salt Industry",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        }
      ]
    },
    {
      district_id: 22,
      district_name: "Thiruvarur",
      constituencies: [
        {
          constituency_id: 166,
          name: "Thiruvarur",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Temple Tourism",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 167,
          name: "Nannilam",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 168,
          name: "Kodavasal",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Education",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 169,
          name: "Valangaiman",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Rural Development",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 170,
          name: "Mannargudi",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Cultural Heritage",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 171,
          name: "Thiruthuraipoondi",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Fisheries",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        }
      ]
    },
    {
      district_id: 23,
      district_name: "Thanjavur",
      constituencies: [
        {
          constituency_id: 172,
          name: "Thanjavur",
          complianceCount: 86,
          issueCount: 14,
          improvementNeeded: "Cultural Heritage",
          improvementCount: 12,
          phoneCallCount: 130,
          positiveFeedbackPercent: 75,
          negativeFeedbackPercent: 25
        },
        {
          constituency_id: 173,
          name: "Orathanadu",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Agriculture",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 174,
          name: "Pattukkottai",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Coastal Development",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 175,
          name: "Peravurani",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Fisheries",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 176,
          name: "Gandharvakottai",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Education",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 177,
          name: "Viralimalai",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Tourism",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        }
      ]
    },
    {
      district_id: 24,
      district_name: "Pudukkottai",
      constituencies: [
        {
          constituency_id: 178,
          name: "Pudukkottai",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Urban Development",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 179,
          name: "Thirumayam",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Fort Conservation",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 180,
          name: "Alangudi",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 181,
          name: "Aranthangi",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Handloom Industry",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 182,
          name: "Karaikudi",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Education",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        }
      ]
    },
    {
      district_id: 25,
      district_name: "Sivaganga",
      constituencies: [
        {
          constituency_id: 183,
          name: "Tirupattur",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 184,
          name: "Karaikudi",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Education",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 185,
          name: "Tiruppathur",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Industrial Growth",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 186,
          name: "Sivagangai",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Tourism",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 187,
          name: "Manamadurai",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Handicrafts",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        }
      ]
    },
    {
      district_id: 26,
      district_name: "Madurai",
      constituencies: [
        {
          constituency_id: 188,
          name: "Melur",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Agriculture",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 189,
          name: "Madurai East",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Urban Development",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        },
        {
          constituency_id: 190,
          name: "Sholavandan",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Education",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 191,
          name: "Madurai North",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Public Transport",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 192,
          name: "Madurai South",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Healthcare",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 193,
          name: "Madurai Central",
          complianceCount: 86,
          issueCount: 14,
          improvementNeeded: "Commercial Development",
          improvementCount: 12,
          phoneCallCount: 130,
          positiveFeedbackPercent: 75,
          negativeFeedbackPercent: 25
        },
        {
          constituency_id: 194,
          name: "Madurai West",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Industrial Growth",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 195,
          name: "Thiruparankundram",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Temple Tourism",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        },
        {
          constituency_id: 196,
          name: "Thirumangalam",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Agriculture",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 197,
          name: "Usilampatti",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Rural Development",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        }
      ]
    },
    {
      district_id: 27,
      district_name: "Theni",
      constituencies: [
        {
          constituency_id: 198,
          name: "Andipatti",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Agriculture",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 199,
          name: "Periyakulam",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Horticulture",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 200,
          name: "Bodinayakkanur",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Spice Industry",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 201,
          name: "Cumbum",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Water Resources",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 202,
          name: "Theni",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Urban Development",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        }
      ]
    },
    {
      district_id: 28,
      district_name: "Virudhunagar",
      constituencies: [
        {
          constituency_id: 203,
          name: "Rajapalayam",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Textile Industry",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 204,
          name: "Srivilliputhur",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Temple Tourism",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 205,
          name: "Sattur",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 206,
          name: "Sivakasi",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Fireworks Industry",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        },
        {
          constituency_id: 207,
          name: "Virudhunagar",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Education",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 208,
          name: "Aruppukkottai",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Industrial Growth",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 209,
          name: "Tiruchuli",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        }
      ]
    },
    {
      district_id: 29,
      district_name: "Ramanathapuram",
      constituencies: [
        {
          constituency_id: 210,
          name: "Paramakudi",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 211,
          name: "Tiruvadanai",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Fisheries",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 212,
          name: "Ramanathapuram",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Tourism",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 213,
          name: "Mudukulathur",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Coastal Development",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 214,
          name: "Vilathikulam",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Salt Industry",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        }
      ]
    },
    {
      district_id: 30,
      district_name: "Thoothukudi",
      constituencies: [
        {
          constituency_id: 215,
          name: "Thoothukudi",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Port Development",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        },
        {
          constituency_id: 216,
          name: "Tiruchendur",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Temple Tourism",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 217,
          name: "Srivaikuntam",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Agriculture",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 218,
          name: "Ottapidaram",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Education",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 219,
          name: "Kovilpatti",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Industrial Growth",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        }
      ]
    },
    {
      district_id: 31,
      district_name: "Tirunelveli",
      constituencies: [
        {
          constituency_id: 220,
          name: "Sankarankovil",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Temple Tourism",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 221,
          name: "Vasudevanallur",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 222,
          name: "Kadayanallur",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Education",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 223,
          name: "Tenkasi",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Tourism",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 224,
          name: "Alangulam",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 225,
          name: "Tirunelveli",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Urban Development",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        },
        {
          constituency_id: 226,
          name: "Ambasamudram",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Healthcare",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 227,
          name: "Palayamkottai",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Education",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 228,
          name: "Nanguneri",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Rural Development",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        }
      ]
    },
    {
      district_id: 32,
      district_name: "Kanniyakumari",
      constituencies: [
        {
          constituency_id: 229,
          name: "Kanniyakumari",
          complianceCount: 86,
          issueCount: 14,
          improvementNeeded: "Tourism",
          improvementCount: 12,
          phoneCallCount: 130,
          positiveFeedbackPercent: 75,
          negativeFeedbackPercent: 25
        },
        {
          constituency_id: 230,
          name: "Nagercoil",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Urban Development",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        },
        {
          constituency_id: 231,
          name: "Colachel",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Fisheries",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 232,
          name: "Padmanabhapuram",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Heritage Conservation",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 233,
          name: "Vilavancode",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 234,
          name: "Killiyoor",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Education",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        }
      ]
    },
    {
      district_id: 33,
      district_name: "Ranipet",
      constituencies: [
        {
          constituency_id: 41,
          name: "Ranipet",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Industrial Growth",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 42,
          name: "Arcot",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Education",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        }
      ]
    },
    {
      district_id: 34,
      district_name: "Tirupattur",
      constituencies: [
        {
          constituency_id: 49,
          name: "Jolarpet",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Railway Infrastructure",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 50,
          name: "Tirupattur",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Healthcare",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        }
      ]
    },
    {
      district_id: 35,
      district_name: "Kallakurichi",
      constituencies: [
        {
          constituency_id: 76,
          name: "Tirukkoyilur",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 77,
          name: "Ulundurpettai",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Education",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 78,
          name: "Rishivandiyam",
          complianceCount: 81,
          issueCount: 19,
          improvementNeeded: "Rural Development",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 70,
          negativeFeedbackPercent: 30
        },
        {
          constituency_id: 79,
          name: "Sankarapuram",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Healthcare",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 80,
          name: "Kallakurichi",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Urban Development",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        }
      ]
    },
    {
      district_id: 36,
      district_name: "Chengalpattu",
      constituencies: [
        {
          constituency_id: 30,
          name: "Pallavaram",
          complianceCount: 85,
          issueCount: 15,
          improvementNeeded: "Urban Infrastructure",
          improvementCount: 12,
          phoneCallCount: 125,
          positiveFeedbackPercent: 74,
          negativeFeedbackPercent: 26
        },
        {
          constituency_id: 31,
          name: "Tambaram",
          complianceCount: 86,
          issueCount: 14,
          improvementNeeded: "Education",
          improvementCount: 12,
          phoneCallCount: 130,
          positiveFeedbackPercent: 75,
          negativeFeedbackPercent: 25
        },
        {
          constituency_id: 32,
          name: "Chengalpattu",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Industrial Growth",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 33,
          name: "Thiruporur",
          complianceCount: 83,
          issueCount: 17,
          improvementNeeded: "Agriculture",
          improvementCount: 14,
          phoneCallCount: 120,
          positiveFeedbackPercent: 72,
          negativeFeedbackPercent: 28
        },
        {
          constituency_id: 34,
          name: "Cheyyur",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Coastal Development",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        },
        {
          constituency_id: 35,
          name: "Madurantakam",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Water Resources",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        }
      ]
    },
    {
      district_id: 37,
      district_name: "Tenkasi",
      constituencies: [
        {
          constituency_id: 223,
          name: "Tenkasi",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Tourism",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 224,
          name: "Alangulam",
          complianceCount: 82,
          issueCount: 18,
          improvementNeeded: "Agriculture",
          improvementCount: 15,
          phoneCallCount: 115,
          positiveFeedbackPercent: 71,
          negativeFeedbackPercent: 29
        }
      ]
    },
    {
      district_id: 38,
      district_name: "Mayiladuthurai",
      constituencies: [
        {
          constituency_id: 161,
          name: "Mayiladuthurai",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Cultural Heritage",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        },
        {
          constituency_id: 161,
          name: "Poompuhar",
          complianceCount: 84,
          issueCount: 16,
          improvementNeeded: "Cultural Heritage",
          improvementCount: 13,
          phoneCallCount: 120,
          positiveFeedbackPercent: 73,
          negativeFeedbackPercent: 27
        }
      ]
    }
  ]
};

export default constituencyData;