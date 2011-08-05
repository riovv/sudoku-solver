/*jslint devel: true, browser: true, sloppy: true, windows: true, plusplus: true, maxerr: 50, indent: 4 */
(function (global) {

    /*
        Create an unique namespace for sudoku solver.
        With CONSTANTS defining sudoku relationships.
    */
    var sudoku = {
        EDITION: "2011-06-09",

        SQUARES: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"],

        UNITS: ({A1: [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"], ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]], A2: [["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"], ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]], A3: [["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"], ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]], A4: [["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"], ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"]], A5: [["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"], ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"]], A6: [["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"], ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"]], A7: [["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"], ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"]], A8: [["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"], ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"]], A9: [["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"], ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"]], B1: [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"], ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"], ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]], B2: [["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"], ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]], B3: [["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"], ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"], ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]], B4: [["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"], ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"], ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"]], B5: [["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"], ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"], ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"]], B6: [["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"], ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"], ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"]], B7: [["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"], ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"], ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"]], B8: [["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"], ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"], ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"]], B9: [["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"], ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"], ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"]], C1: [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"], ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"], ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]], C2: [["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"], ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]], C3: [["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"], ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"], ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]], C4: [["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"], ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"], ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"]], C5: [["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"], ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"], ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"]], C6: [["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"], ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"], ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"]], C7: [["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"], ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"], ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"]], C8: [["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"], ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"], ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"]], C9: [["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"], ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"], ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"]], D1: [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"], ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"]], D2: [["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"]], D3: [["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"], ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"]], D4: [["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"], ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"]], D5: [["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"], ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"]], D6: [["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"], ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"]], D7: [["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"], ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"]], D8: [["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"], ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"]], D9: [["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"], ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"]], E1: [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"], ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"]], E2: [["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"]], E3: [["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"], ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"]], E4: [["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"], ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"]], E5: [["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"], ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"]], E6: [["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"], ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"]], E7: [["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"], ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"]], E8: [["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"], ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"]], E9: [["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"], ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"]], F1: [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"], ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"]], F2: [["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"]], F3: [["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"], ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"]], F4: [["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"], ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"]], F5: [["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"], ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"]], F6: [["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"], ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"]], F7: [["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"], ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"]], F8: [["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"], ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"]], F9: [["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"], ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"]], G1: [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"], ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"]], G2: [["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"], ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"]], G3: [["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"], ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"]], G4: [["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"]], G5: [["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"]], G6: [["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"]], G7: [["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"], ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]], G8: [["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"], ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]], G9: [["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"], ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]], H1: [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"], ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"], ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"]], H2: [["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"], ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"]], H3: [["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"], ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"], ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"]], H4: [["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"], ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"]], H5: [["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"], ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"]], H6: [["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"], ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"]], H7: [["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"], ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"], ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]], H8: [["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"], ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"], ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]], H9: [["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"], ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"], ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]], I1: [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"], ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"]], I2: [["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"]], I3: [["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"], ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"]], I4: [["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"], ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"]], I5: [["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"], ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"]], I6: [["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"], ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"]], I7: [["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"], ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]], I8: [["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"], ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]], I9: [["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"], ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]]}),
        
        ALL_UNITS: [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"], ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], ["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"], ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"], ["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"], ["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"], ["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"], ["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"], ["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"], ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"], ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"], ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"], ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"], ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"], ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"], ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"], ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"], ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"], ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"], ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"], ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]],
       
        PEERS: ({A1: ["B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "B2", "B3", "C2", "C3"], A2: ["B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2", "A1", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "B1", "B3", "C1", "C3"], A3: ["B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3", "A1", "A2", "A4", "A5", "A6", "A7", "A8", "A9", "B1", "B2", "C1", "C2"], A4: ["B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4", "A1", "A2", "A3", "A5", "A6", "A7", "A8", "A9", "B5", "B6", "C5", "C6"], A5: ["B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5", "A1", "A2", "A3", "A4", "A6", "A7", "A8", "A9", "B4", "B6", "C4", "C6"], A6: ["B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6", "A1", "A2", "A3", "A4", "A5", "A7", "A8", "A9", "B4", "B5", "C4", "C5"], A7: ["B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7", "A1", "A2", "A3", "A4", "A5", "A6", "A8", "A9", "B8", "B9", "C8", "C9"], A8: ["B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A9", "B7", "B9", "C7", "C9"], A9: ["B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "B7", "B8", "C7", "C8"], B1: ["A1", "C1", "D1", "E1", "F1", "G1", "H1", "I1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "A2", "A3", "C2", "C3"], B2: ["A2", "C2", "D2", "E2", "F2", "G2", "H2", "I2", "B1", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "A1", "A3", "C1", "C3"], B3: ["A3", "C3", "D3", "E3", "F3", "G3", "H3", "I3", "B1", "B2", "B4", "B5", "B6", "B7", "B8", "B9", "A1", "A2", "C1", "C2"], B4: ["A4", "C4", "D4", "E4", "F4", "G4", "H4", "I4", "B1", "B2", "B3", "B5", "B6", "B7", "B8", "B9", "A5", "A6", "C5", "C6"], B5: ["A5", "C5", "D5", "E5", "F5", "G5", "H5", "I5", "B1", "B2", "B3", "B4", "B6", "B7", "B8", "B9", "A4", "A6", "C4", "C6"], B6: ["A6", "C6", "D6", "E6", "F6", "G6", "H6", "I6", "B1", "B2", "B3", "B4", "B5", "B7", "B8", "B9", "A4", "A5", "C4", "C5"], B7: ["A7", "C7", "D7", "E7", "F7", "G7", "H7", "I7", "B1", "B2", "B3", "B4", "B5", "B6", "B8", "B9", "A8", "A9", "C8", "C9"], B8: ["A8", "C8", "D8", "E8", "F8", "G8", "H8", "I8", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B9", "A7", "A9", "C7", "C9"], B9: ["A9", "C9", "D9", "E9", "F9", "G9", "H9", "I9", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "A7", "A8", "C7", "C8"], C1: ["A1", "B1", "D1", "E1", "F1", "G1", "H1", "I1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "A2", "A3", "B2", "B3"], C2: ["A2", "B2", "D2", "E2", "F2", "G2", "H2", "I2", "C1", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "A1", "A3", "B1", "B3"], C3: ["A3", "B3", "D3", "E3", "F3", "G3", "H3", "I3", "C1", "C2", "C4", "C5", "C6", "C7", "C8", "C9", "A1", "A2", "B1", "B2"], C4: ["A4", "B4", "D4", "E4", "F4", "G4", "H4", "I4", "C1", "C2", "C3", "C5", "C6", "C7", "C8", "C9", "A5", "A6", "B5", "B6"], C5: ["A5", "B5", "D5", "E5", "F5", "G5", "H5", "I5", "C1", "C2", "C3", "C4", "C6", "C7", "C8", "C9", "A4", "A6", "B4", "B6"], C6: ["A6", "B6", "D6", "E6", "F6", "G6", "H6", "I6", "C1", "C2", "C3", "C4", "C5", "C7", "C8", "C9", "A4", "A5", "B4", "B5"], C7: ["A7", "B7", "D7", "E7", "F7", "G7", "H7", "I7", "C1", "C2", "C3", "C4", "C5", "C6", "C8", "C9", "A8", "A9", "B8", "B9"], C8: ["A8", "B8", "D8", "E8", "F8", "G8", "H8", "I8", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C9", "A7", "A9", "B7", "B9"], C9: ["A9", "B9", "D9", "E9", "F9", "G9", "H9", "I9", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "A7", "A8", "B7", "B8"], D1: ["A1", "B1", "C1", "E1", "F1", "G1", "H1", "I1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "E2", "E3", "F2", "F3"], D2: ["A2", "B2", "C2", "E2", "F2", "G2", "H2", "I2", "D1", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "E1", "E3", "F1", "F3"], D3: ["A3", "B3", "C3", "E3", "F3", "G3", "H3", "I3", "D1", "D2", "D4", "D5", "D6", "D7", "D8", "D9", "E1", "E2", "F1", "F2"], D4: ["A4", "B4", "C4", "E4", "F4", "G4", "H4", "I4", "D1", "D2", "D3", "D5", "D6", "D7", "D8", "D9", "E5", "E6", "F5", "F6"], D5: ["A5", "B5", "C5", "E5", "F5", "G5", "H5", "I5", "D1", "D2", "D3", "D4", "D6", "D7", "D8", "D9", "E4", "E6", "F4", "F6"], D6: ["A6", "B6", "C6", "E6", "F6", "G6", "H6", "I6", "D1", "D2", "D3", "D4", "D5", "D7", "D8", "D9", "E4", "E5", "F4", "F5"], D7: ["A7", "B7", "C7", "E7", "F7", "G7", "H7", "I7", "D1", "D2", "D3", "D4", "D5", "D6", "D8", "D9", "E8", "E9", "F8", "F9"], D8: ["A8", "B8", "C8", "E8", "F8", "G8", "H8", "I8", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D9", "E7", "E9", "F7", "F9"], D9: ["A9", "B9", "C9", "E9", "F9", "G9", "H9", "I9", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "E7", "E8", "F7", "F8"], E1: ["A1", "B1", "C1", "D1", "F1", "G1", "H1", "I1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "D2", "D3", "F2", "F3"], E2: ["A2", "B2", "C2", "D2", "F2", "G2", "H2", "I2", "E1", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "D1", "D3", "F1", "F3"], E3: ["A3", "B3", "C3", "D3", "F3", "G3", "H3", "I3", "E1", "E2", "E4", "E5", "E6", "E7", "E8", "E9", "D1", "D2", "F1", "F2"], E4: ["A4", "B4", "C4", "D4", "F4", "G4", "H4", "I4", "E1", "E2", "E3", "E5", "E6", "E7", "E8", "E9", "D5", "D6", "F5", "F6"], E5: ["A5", "B5", "C5", "D5", "F5", "G5", "H5", "I5", "E1", "E2", "E3", "E4", "E6", "E7", "E8", "E9", "D4", "D6", "F4", "F6"], E6: ["A6", "B6", "C6", "D6", "F6", "G6", "H6", "I6", "E1", "E2", "E3", "E4", "E5", "E7", "E8", "E9", "D4", "D5", "F4", "F5"], E7: ["A7", "B7", "C7", "D7", "F7", "G7", "H7", "I7", "E1", "E2", "E3", "E4", "E5", "E6", "E8", "E9", "D8", "D9", "F8", "F9"], E8: ["A8", "B8", "C8", "D8", "F8", "G8", "H8", "I8", "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E9", "D7", "D9", "F7", "F9"], E9: ["A9", "B9", "C9", "D9", "F9", "G9", "H9", "I9", "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "D7", "D8", "F7", "F8"], F1: ["A1", "B1", "C1", "D1", "E1", "G1", "H1", "I1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "D2", "D3", "E2", "E3"], F2: ["A2", "B2", "C2", "D2", "E2", "G2", "H2", "I2", "F1", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "D1", "D3", "E1", "E3"], F3: ["A3", "B3", "C3", "D3", "E3", "G3", "H3", "I3", "F1", "F2", "F4", "F5", "F6", "F7", "F8", "F9", "D1", "D2", "E1", "E2"], F4: ["A4", "B4", "C4", "D4", "E4", "G4", "H4", "I4", "F1", "F2", "F3", "F5", "F6", "F7", "F8", "F9", "D5", "D6", "E5", "E6"], F5: ["A5", "B5", "C5", "D5", "E5", "G5", "H5", "I5", "F1", "F2", "F3", "F4", "F6", "F7", "F8", "F9", "D4", "D6", "E4", "E6"], F6: ["A6", "B6", "C6", "D6", "E6", "G6", "H6", "I6", "F1", "F2", "F3", "F4", "F5", "F7", "F8", "F9", "D4", "D5", "E4", "E5"], F7: ["A7", "B7", "C7", "D7", "E7", "G7", "H7", "I7", "F1", "F2", "F3", "F4", "F5", "F6", "F8", "F9", "D8", "D9", "E8", "E9"], F8: ["A8", "B8", "C8", "D8", "E8", "G8", "H8", "I8", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F9", "D7", "D9", "E7", "E9"], F9: ["A9", "B9", "C9", "D9", "E9", "G9", "H9", "I9", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "D7", "D8", "E7", "E8"], G1: ["A1", "B1", "C1", "D1", "E1", "F1", "H1", "I1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "H2", "H3", "I2", "I3"], G2: ["A2", "B2", "C2", "D2", "E2", "F2", "H2", "I2", "G1", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "H1", "H3", "I1", "I3"], G3: ["A3", "B3", "C3", "D3", "E3", "F3", "H3", "I3", "G1", "G2", "G4", "G5", "G6", "G7", "G8", "G9", "H1", "H2", "I1", "I2"], G4: ["A4", "B4", "C4", "D4", "E4", "F4", "H4", "I4", "G1", "G2", "G3", "G5", "G6", "G7", "G8", "G9", "H5", "H6", "I5", "I6"], G5: ["A5", "B5", "C5", "D5", "E5", "F5", "H5", "I5", "G1", "G2", "G3", "G4", "G6", "G7", "G8", "G9", "H4", "H6", "I4", "I6"], G6: ["A6", "B6", "C6", "D6", "E6", "F6", "H6", "I6", "G1", "G2", "G3", "G4", "G5", "G7", "G8", "G9", "H4", "H5", "I4", "I5"], G7: ["A7", "B7", "C7", "D7", "E7", "F7", "H7", "I7", "G1", "G2", "G3", "G4", "G5", "G6", "G8", "G9", "H8", "H9", "I8", "I9"], G8: ["A8", "B8", "C8", "D8", "E8", "F8", "H8", "I8", "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G9", "H7", "H9", "I7", "I9"], G9: ["A9", "B9", "C9", "D9", "E9", "F9", "H9", "I9", "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "H7", "H8", "I7", "I8"], H1: ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "I1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "G2", "G3", "I2", "I3"], H2: ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "I2", "H1", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "G1", "G3", "I1", "I3"], H3: ["A3", "B3", "C3", "D3", "E3", "F3", "G3", "I3", "H1", "H2", "H4", "H5", "H6", "H7", "H8", "H9", "G1", "G2", "I1", "I2"], H4: ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "I4", "H1", "H2", "H3", "H5", "H6", "H7", "H8", "H9", "G5", "G6", "I5", "I6"], H5: ["A5", "B5", "C5", "D5", "E5", "F5", "G5", "I5", "H1", "H2", "H3", "H4", "H6", "H7", "H8", "H9", "G4", "G6", "I4", "I6"], H6: ["A6", "B6", "C6", "D6", "E6", "F6", "G6", "I6", "H1", "H2", "H3", "H4", "H5", "H7", "H8", "H9", "G4", "G5", "I4", "I5"], H7: ["A7", "B7", "C7", "D7", "E7", "F7", "G7", "I7", "H1", "H2", "H3", "H4", "H5", "H6", "H8", "H9", "G8", "G9", "I8", "I9"], H8: ["A8", "B8", "C8", "D8", "E8", "F8", "G8", "I8", "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H9", "G7", "G9", "I7", "I9"], H9: ["A9", "B9", "C9", "D9", "E9", "F9", "G9", "I9", "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "G7", "G8", "I7", "I8"], I1: ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "G2", "G3", "H2", "H3"], I2: ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I1", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "G1", "G3", "H1", "H3"], I3: ["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I1", "I2", "I4", "I5", "I6", "I7", "I8", "I9", "G1", "G2", "H1", "H2"], I4: ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I1", "I2", "I3", "I5", "I6", "I7", "I8", "I9", "G5", "G6", "H5", "H6"], I5: ["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I1", "I2", "I3", "I4", "I6", "I7", "I8", "I9", "G4", "G6", "H4", "H6"], I6: ["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I1", "I2", "I3", "I4", "I5", "I7", "I8", "I9", "G4", "G5", "H4", "H5"], I7: ["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I1", "I2", "I3", "I4", "I5", "I6", "I8", "I9", "G8", "G9", "H8", "H9"], I8: ["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I1", "I2", "I3", "I4", "I5", "I6", "I7", "I9", "G7", "G9", "H7", "H9"], I9: ["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "G7", "G8", "H7", "H8"]}),
       
        DIGITS: ({A1: "123456789", A2: "123456789", A3: "123456789", A4: "123456789", A5: "123456789", A6: "123456789", A7: "123456789", A8: "123456789", A9: "123456789", B1: "123456789", B2: "123456789", B3: "123456789", B4: "123456789", B5: "123456789", B6: "123456789", B7: "123456789", B8: "123456789", B9: "123456789", C1: "123456789", C2: "123456789", C3: "123456789", C4: "123456789", C5: "123456789", C6: "123456789", C7: "123456789", C8: "123456789", C9: "123456789", D1: "123456789", D2: "123456789", D3: "123456789", D4: "123456789", D5: "123456789", D6: "123456789", D7: "123456789", D8: "123456789", D9: "123456789", E1: "123456789", E2: "123456789", E3: "123456789", E4: "123456789", E5: "123456789", E6: "123456789", E7: "123456789", E8: "123456789", E9: "123456789", F1: "123456789", F2: "123456789", F3: "123456789", F4: "123456789", F5: "123456789", F6: "123456789", F7: "123456789", F8: "123456789", F9: "123456789", G1: "123456789", G2: "123456789", G3: "123456789", G4: "123456789", G5: "123456789", G6: "123456789", G7: "123456789", G8: "123456789", G9: "123456789", H1: "123456789", H2: "123456789", H3: "123456789", H4: "123456789", H5: "123456789", H6: "123456789", H7: "123456789", H8: "123456789", H9: "123456789", I1: "123456789", I2: "123456789", I3: "123456789", I4: "123456789", I5: "123456789", I6: "123456789", I7: "123456789", I8: "123456789", I9: "123456789"})  
    },
        // Declaring the var, definition of cloneObject/compareObject is in the bottom of this closure.
        cloneObject,
        compareObject,
        each,
        unionArrays;
    
    sudoku.solver = {
        // Working copy of sudoku.DIGITS
        digits: {},
        // To keep track on which naked and hidden pairs/triples/quads that has already been run.
        alreadyEliminated: {naked: [], hidden: []},
        
        /* 
            Main method that runs the solving part
        */
        run: function (gridDigits) {
            var s;
            sudoku.solver.digits = cloneObject(sudoku.DIGITS);
            sudoku.solver.alreadyEliminatedNakeds = [];
            
            // Assign grid digits.
            if (!sudoku.solver.assignGridDigits(sudoku.solver.digits, gridDigits)) {
                return false;
            }

            if (!sudoku.solver.loop(sudoku.solver.digits)) {
                return false;
            }

            if (!sudoku.solver.brute(sudoku.solver.digits)) {
                return false;           
            }

            return sudoku.solver.digits;
        },

        loop: function (digits) {
            var previousDigits;

            /* 
                Run methods that doesn't have a direct relationship with
                the square and digit that was affected by the elimination in
                an iterative process on the whole grid.
            */
            do {
                // Create a clone to compare and see if something changed during this iteration.
                previousDigits = cloneObject(digits);

                // Check single candidate, and assign if found.
                if (!sudoku.solver.assignSingleCandidate(digits)) {
                    return false;
                }
                
                // Check candidate lines, and eliminate if found.
                if (!sudoku.solver.eliminateCandidateLines(digits)) {
                    return false;
                }
                
                // Check naked pairs/triples/quads, and eliminate if found.
                if (!sudoku.solver.eliminateNaked(digits)) {
                    return false;
                }
            } while (!compareObject(previousDigits, digits));
            
            return digits;
              
        },

        assignGridDigits: function (digits, gridDigits) {
            // Assign digits from the grid.
            for (s in gridDigits) {
                if (gridDigits.hasOwnProperty(s)) {
                    if (!sudoku.solver.assign(digits, s, gridDigits[s])) {
                        return false;
                    }            
                }
            }          

            return digits;
        },
        
        /*
            Eliminate all the other digits (except d) from digits[s] and propagate.
            Return digits, except return False if a contradiction is detected.
        */
        assign: function (digits, square, digit) {
            var otherDigits = digits[square].replace(digit, "");
            
            if (!sudoku.solver.eliminateMultiple(digits, [square], otherDigits)) {
                return false;
            }

            return digits;
        },
       
        eliminate: function (digits, square, digit) {
            //  Value has already been eliminated.
            if (digits[square].indexOf(digit) === -1) {
                return digits;
            }
           
            // Eliminate
            digits[square] = digits[square].replace(digit, "");
           
            // Can not remove the last value, invalid input?
            if (digits[square].length === 0) {
                return false;
            } else if (digits[square].length === 1) {
                /*
                    Eliminate a digit from all of the square's peers.
                    If a square has been assigned a digit, that digit can not 
                    exist in any of its' peers.
                */
                if (!sudoku.solver.eliminateMultiple(digits, sudoku.PEERS[square], digits[square])) {
                    return false;
                }    
            }
            
            return digits;
        },
        
        /*
            A shorthand function of eliminating multiple digits from multiple squares.
            Where square and digit in this case are both 0 indexed arrays of n values. (also work on string of digits)
        */
        eliminateMultiple: function (digits, square, digit) {
            var d, s;
            
            for (d = 0; d < digit.length; d++) {
                for (s = 0; s < square.length; s++) {
                    if (!sudoku.solver.eliminate(digits, square[s], digit[d])) {
                        return false;
                    }
                }
            }
            
            return digits;
        },
        
        /*
            In a unit, if a digit only has one possible square to
            which it can be assigned. Then assign it there.
            
            TODO: Make sure this does not run more than once per combination.
        */
        assignSingleCandidate: function (digits) {
            var u, s, possible, unit, digit;

            
            for (u = 0; u < sudoku.ALL_UNITS.length; u++) {
                unit = sudoku.ALL_UNITS[u];
                
                for (digit = 1; digit < 10; digit++) {
                    possible = [];
                    for (s in unit) {
                        if (unit.hasOwnProperty(s)) {
                            if (digits[unit[s]].indexOf(digit) !== -1) {
                                possible.push(unit[s]);
                                if(possible.length > 1) {
                                    break;
                                }
                            }
                        }
                    }
                    // Invalid input?
                    if (possible.length === 0) {
                        return false;
                    } else if (possible.length === 1 && digits[possible[0]] > 1) {
                        if (!sudoku.solver.assign(digits, possible[0], digit)) {
                            return false;
                        }
                    }                
                }
            }
        
            return digits;
        },
        
        /*
            Inside a box unit if all possible squares for a digit are in line horizontically or vertically.
            Even if it is impossible to know exactly where to assign the digit, we can eliminate the digit from
            all other squares in the horizontal/vertical unit of those squares.
            
            Example: http://www.palmsudoku.com/pages/techniques-3.php
        */
        eliminateCandidateLines: function (digits) {
            var u, i, j, s, digit, boxUnit, direction, unit, possibleLine,
                possibleSquares = {horizontal: [], vertical: []},
                possibleLines = {horizontal: [], vertical: []};
                
            // All box units                
            for (u = 2; u < 9; u += 3) {
                boxUnit = sudoku.ALL_UNITS[u];
               
                for (digit = 1; digit < 10; digit++) {
                     
                    // Determine the possible lines for this digit.
                    possibleLines = {horizontal: [], vertical: []};
                    for (i = 0; i < 3; i++) {
                        possibleSquares = {horizontal: [], vertical: []};
                        
                        // Horizontal lines.
                        for (j = 0; j < 3; j++) {
                            if (digits[boxUnit[i + j]].indexOf(digit) !== -1) {
                                possibleSquares.horizontal.push(boxUnit[i + j]);
                            }
                        }
                        
                        if (possibleSquares.horizontal.length > 0) {
                            possibleLines.horizontal.push(possibleSquares.horizontal);
                        } 
                        
                        // Vertical lines.
                        for (j = 0; j < 9; j += 3) {
                            if (digits[boxUnit[i + j]].indexOf(digit) !== -1) {
                                possibleSquares.vertical.push(boxUnit[i + j]);
                            }
                        }
                        
                        if (possibleSquares.vertical.length > 0) {
                            possibleLines.vertical.push(possibleSquares.vertical);
                        }
                    }
                    
                    /* 
                        The digit only has one possible line.
                        It can safely be eliminated from all other squares that
                        are in line and outside this box unit.
                    */
                    
                    // Determine direction, there can never be a candidate line in both directions.
                    direction = (possibleLines.horizontal.length === 1 && possibleLines.horizontal[0].length > 1) ? "horizontal" :
                        (possibleLines.vertical.length === 1 && possibleLines.vertical[0].length > 1) ? "vertical" : "";
                    
                    if (direction) {
                        possibleLine = possibleLines[direction][0];
                     
                        // Get a copy of the unit to eliminate digit from
                        unit = (direction === "horizontal") ? sudoku.UNITS[possibleLine[0]][1].slice() : sudoku.UNITS[possibleLine[0]][0].slice();

                        // Remove the squares that form the line from the copy.
                        for (s = 0; s < possibleLine.length; s++) {
                            unit.splice(unit.indexOf(possibleLine[s]), 1);
                        }
                        
                        // Eliminate the digit from all other squares that are in line with these in other box units.
                        if (!sudoku.solver.eliminateMultiple(digits, unit, [digit])) {
                            return false;
                        }
                    }
                    
                }
            }
            
            return digits;
        },
        
        /*
            A group of digits (2,3,4) in a unit might only be able to be assigned to 2,3 or 4 squares.
            It is unknown where each digit should be assigned, but it is certain that these digits
            must be placed in these squares. Therefor they can be eliminated from all others in that unit.       
            
            http://www.palmsudoku.com/pages/techniques-6.php   
            
            TODO: This method has to be rewritten to find nakeds when theres not a superset. Triple: {2,4} {4,6} {6,2}
        */
        eliminateNaked: function (digits) {
            var i, j, k, m, u, s, unit,
                unassigned = [],
                union = [],
                notNaked = [];
                
            for (u = 0; u < sudoku.ALL_UNITS.length; u++) {
                unit = sudoku.ALL_UNITS[u];
            
                /* 
                    Create a temp unit without the squares that have not yet been assigned a digit.
                    Squares with digits already assigned are irrelevant for this method.
                */       
                unassigned = [];
                for (s = 0; s < unit.length; s++) {
                    if (digits[unit[s]].length > 1) {
                        unassigned.push(unit[s]);
                    }
                }    
                
                // Check for pairs.
                for (i = 0; i < unassigned.length - 1; i++) {
                    for (j = i + 1; j < unassigned.length; j++) {
                    
                        union = unionArrays([
                            digits[unassigned[i]],
                            digits[unassigned[j]]
                        ]);
                        
                        if (union.length === 2) {
                            // Eliminate digits from all other squares in unit.    
                            notNaked = unassigned.slice();
                            notNaked.splice(j, 1);
                            notNaked.splice(i, 1); 
                            
                            if (!sudoku.solver.eliminateMultiple(digits, notNaked, union)) {
                                return false;
                            }
                        }
                        
                    }
                }

                // Check for triples.
                for (i = 0; i < unassigned.length - 2; i++) {
                    for (j = i + 1; j < unassigned.length - 1; j++) {
                        for (k = j + 1; k < unassigned.length; k++) {
                        
                            union = unionArrays([
                                digits[unassigned[i]],
                                digits[unassigned[j]],
                                digits[unassigned[k]]
                            ]);
                            
                            if (union.length === 3) {
                                // Eliminate digits from all other squares in unit.    
                                notNaked = unassigned.slice();
                                notNaked.splice(k, 1);
                                notNaked.splice(j, 1);
                                notNaked.splice(i, 1); 
                                
                                if (!sudoku.solver.eliminateMultiple(digits, notNaked, union)) {
                                    return false;
                                }
                            }
                        
                        }
                    }
                }
                
                // Check for quads.
                for (i = 0; i < unassigned.length - 3; i++) {
                    for (j = i + 1; j < unassigned.length - 2; j++) {
                        for (k = j + 1; k < unassigned.length - 1; k++) {
                            for (m = k + 1; m < unassigned.length; m++) {
                                union = unionArrays([
                                    digits[unassigned[i]], 
                                    digits[unassigned[j]], 
                                    digits[unassigned[k]], 
                                    digits[unassigned[m]]
                                ]);
                                
                                if (union.length === 4) {
                                    // Eliminate digits from all other squares in unit.    
                                    notNaked = unassigned.slice();
                                    notNaked.splice(m, 1);
                                    notNaked.splice(k, 1);
                                    notNaked.splice(j, 1);
                                    notNaked.splice(i, 1); 
                                    
                                    if (!sudoku.solver.eliminateMultiple(digits, notNaked, union)) {
                                        return false;
                                    }
                                }
                                
                            }                    
                        }
                    }
                }

            }

            return digits;
        },
        brute: function (digits) {
            var i,
                minPossible = {square: null, digits: "12345678910"},
                solved = true;

            // Find the square with least possible digits or check if the puzzle is now solved!
            for (i in digits) {
                if (digits.hasOwnProperty(i)) {
                    solved &= (digits[i].length === 1);
                    if (digits[i].length > 1 && (digits[i].length < minPossible.digits.length)) {
                        minPossible.square = i;
                        minPossible.digits = digits[i];
                    }
                }
            }

            if (solved) {
                sudoku.solver.digits = digits;
                return digits;
            }
            
            
            // Try to assign each possible digit and see if anyone turns out to be successful.
            for (i = 0; i < minPossible.digits.length; i++) {
                digitsCopy = cloneObject(digits);


                if (!sudoku.solver.brute(sudoku.solver.assign(digitsCopy, minPossible.square, minPossible.digits[i]))) {
                    continue;
                }
                result = sudoku.solver.loop(digitsCopy);
                if (result) {
                    return sudoku.solver.brute(result);
                }
            }
            return false;
        }
                
    };

    sudoku.parseGrid = function () {
        var i, value,
            gridDigits = {},
            nodeList = global.document.querySelectorAll('table#sudoku tr td input');
        
        // Get valid digits from grid and remove invalid.   
        for (i = 0; i < nodeList.length; i++) {
            value = +nodeList[i].value;
            if (value > 0 && value < 10) {
                gridDigits[nodeList[i].id] = String(value);
            } else {
                nodeList[i].value = "";
            }
        }   
        
        return gridDigits;
    };
    
    sudoku.populateGrid = function (digits) {
        var i,
            gridDigits = {},
            nodeList = global.document.querySelectorAll('table#sudoku tr td input');
        
        // Clear the grid first.
        sudoku.clearGrid();    
        
        for (i = 0; i < nodeList.length; i++) {
            if (digits.hasOwnProperty(nodeList[i].id) && digits[nodeList[i].id].length === 1) {
                gridDigits[nodeList[i].id] = nodeList[i].value = digits[nodeList[i].id];
            }
        }
        
        return gridDigits;    
    };
    
    sudoku.clearGrid = function () {
        var i,
            nodeList = global.document.querySelectorAll('table#sudoku tr td input');
        
        for (i = 0; i < nodeList.length; i++) {
            nodeList[i].value = "";
        }
    };
    
    /*
        An utility functions to clone an Object.
        Used by sudoku.solver.run() in order to clone the starting digits into 
        a new instance.
    */
    cloneObject = function (obj) {
        var i,
            target = {};
            
        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                target[i] = obj[i];
            }
        }
        
        return target;
    };
    
    /*
        An utility function to compare two one dimensional
        object to see if they are equal.
    */
    compareObject = function (a, b) {
        var i;
        
        for (i in a) {
            if (a.hasOwnProperty(i)) {
                if (!b.hasOwnProperty(i) || a[i] !== b[i]) {
                    return false;
                }
            }
        }
        
        return true;
    };
    
    /*
        Merges two 0 indexed arrays together by their shared values.
        for example: [1, 2, 3] and [1, 2, 4, 5] becomes [1, 2, 3, 4, 5]
        (strings will also work)...
    */
    unionArrays = function (arrays) {
        var i, a,
            union = [];
            
          for (a = 0; a < arrays.length; a++) {
             for (i = 0; i < arrays[a].length; i++) {
                 if (union.indexOf(arrays[a][i]) === -1) {
                    union.push(arrays[a][i]);
                }       
            }       
        }      
        
        return union;
    };
   
    global.sudoku = sudoku;
    return global.sudoku;
   
}(typeof window === 'undefined' ? this : window)); 
