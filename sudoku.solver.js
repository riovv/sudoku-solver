/*jslint white: true, devel: true, onevar: true, browser: true, undef: true, nomen: true, regexp: true, continue: true, windows: true, newcap: true, maxerr: 50, indent: 4 */
(function (global) {

    /*
        Create an unique namespace for sudoku solver.
        With CONSTANTS defining sudoku relationships.
    */
	var sudoku = {
        VERSION: "0.5",

        SQUARES: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"],

        UNITS: ({A1: [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"], ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]], A2: [["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"], ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]], A3: [["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"], ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]], A4: [["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"], ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"]], A5: [["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"], ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"]], A6: [["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"], ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"]], A7: [["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"], ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"]], A8: [["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"], ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"]], A9: [["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"], ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"]], B1: [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"], ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"], ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]], B2: [["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"], ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]], B3: [["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"], ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"], ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]], B4: [["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"], ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"], ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"]], B5: [["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"], ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"], ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"]], B6: [["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"], ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"], ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"]], B7: [["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"], ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"], ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"]], B8: [["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"], ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"], ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"]], B9: [["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"], ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"], ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"]], C1: [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"], ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"], ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]], C2: [["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"], ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]], C3: [["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"], ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"], ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]], C4: [["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"], ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"], ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"]], C5: [["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"], ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"], ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"]], C6: [["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"], ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"], ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"]], C7: [["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"], ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"], ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"]], C8: [["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"], ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"], ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"]], C9: [["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"], ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"], ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"]], D1: [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"], ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"]], D2: [["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"]], D3: [["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"], ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"]], D4: [["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"], ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"]], D5: [["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"], ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"]], D6: [["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"], ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"]], D7: [["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"], ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"]], D8: [["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"], ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"]], D9: [["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"], ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"]], E1: [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"], ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"]], E2: [["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"]], E3: [["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"], ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"]], E4: [["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"], ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"]], E5: [["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"], ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"]], E6: [["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"], ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"]], E7: [["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"], ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"]], E8: [["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"], ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"]], E9: [["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"], ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"]], F1: [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"], ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"]], F2: [["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"]], F3: [["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"], ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"]], F4: [["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"], ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"]], F5: [["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"], ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"]], F6: [["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"], ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"]], F7: [["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"], ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"]], F8: [["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"], ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"]], F9: [["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"], ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"]], G1: [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"], ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"]], G2: [["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"], ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"]], G3: [["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"], ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"]], G4: [["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"]], G5: [["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"]], G6: [["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"]], G7: [["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"], ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]], G8: [["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"], ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]], G9: [["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"], ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]], H1: [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"], ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"], ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"]], H2: [["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"], ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"]], H3: [["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"], ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"], ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"]], H4: [["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"], ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"]], H5: [["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"], ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"]], H6: [["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"], ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"]], H7: [["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"], ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"], ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]], H8: [["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"], ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"], ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]], H9: [["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"], ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"], ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]], I1: [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"], ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"]], I2: [["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"]], I3: [["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"], ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"]], I4: [["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"], ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"]], I5: [["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"], ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"]], I6: [["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"], ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"]], I7: [["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"], ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]], I8: [["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"], ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]], I9: [["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"], ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]]}),
        
/*         ALL_UNITS: [["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"], ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], ["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3"], ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4"], ["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5"], ["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6"], ["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7"], ["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"], ["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9"], ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"], ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"], ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"], ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"], ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"], ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"], ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"], ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"], ["A4", "A5", "A6", "B4", "B5", "B6", "C4", "C5", "C6"], ["A7", "A8", "A9", "B7", "B8", "B9", "C7", "C8", "C9"], ["D1", "D2", "D3", "E1", "E2", "E3", "F1", "F2", "F3"], ["D4", "D5", "D6", "E4", "E5", "E6", "F4", "F5", "F6"], ["D7", "D8", "D9", "E7", "E8", "E9", "F7", "F8", "F9"], ["G1", "G2", "G3", "H1", "H2", "H3", "I1", "I2", "I3"], ["G4", "G5", "G6", "H4", "H5", "H6", "I4", "I5", "I6"], ["G7", "G8", "G9", "H7", "H8", "H9", "I7", "I8", "I9"]], */
       
        PEERS: ({A1: ["B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "B2", "B3", "C2", "C3"], A2: ["B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2", "A1", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "B1", "B3", "C1", "C3"], A3: ["B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3", "A1", "A2", "A4", "A5", "A6", "A7", "A8", "A9", "B1", "B2", "C1", "C2"], A4: ["B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4", "A1", "A2", "A3", "A5", "A6", "A7", "A8", "A9", "B5", "B6", "C5", "C6"], A5: ["B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5", "A1", "A2", "A3", "A4", "A6", "A7", "A8", "A9", "B4", "B6", "C4", "C6"], A6: ["B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6", "A1", "A2", "A3", "A4", "A5", "A7", "A8", "A9", "B4", "B5", "C4", "C5"], A7: ["B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7", "A1", "A2", "A3", "A4", "A5", "A6", "A8", "A9", "B8", "B9", "C8", "C9"], A8: ["B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A9", "B7", "B9", "C7", "C9"], A9: ["B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "B7", "B8", "C7", "C8"], B1: ["A1", "C1", "D1", "E1", "F1", "G1", "H1", "I1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "A2", "A3", "C2", "C3"], B2: ["A2", "C2", "D2", "E2", "F2", "G2", "H2", "I2", "B1", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "A1", "A3", "C1", "C3"], B3: ["A3", "C3", "D3", "E3", "F3", "G3", "H3", "I3", "B1", "B2", "B4", "B5", "B6", "B7", "B8", "B9", "A1", "A2", "C1", "C2"], B4: ["A4", "C4", "D4", "E4", "F4", "G4", "H4", "I4", "B1", "B2", "B3", "B5", "B6", "B7", "B8", "B9", "A5", "A6", "C5", "C6"], B5: ["A5", "C5", "D5", "E5", "F5", "G5", "H5", "I5", "B1", "B2", "B3", "B4", "B6", "B7", "B8", "B9", "A4", "A6", "C4", "C6"], B6: ["A6", "C6", "D6", "E6", "F6", "G6", "H6", "I6", "B1", "B2", "B3", "B4", "B5", "B7", "B8", "B9", "A4", "A5", "C4", "C5"], B7: ["A7", "C7", "D7", "E7", "F7", "G7", "H7", "I7", "B1", "B2", "B3", "B4", "B5", "B6", "B8", "B9", "A8", "A9", "C8", "C9"], B8: ["A8", "C8", "D8", "E8", "F8", "G8", "H8", "I8", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B9", "A7", "A9", "C7", "C9"], B9: ["A9", "C9", "D9", "E9", "F9", "G9", "H9", "I9", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "A7", "A8", "C7", "C8"], C1: ["A1", "B1", "D1", "E1", "F1", "G1", "H1", "I1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "A2", "A3", "B2", "B3"], C2: ["A2", "B2", "D2", "E2", "F2", "G2", "H2", "I2", "C1", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "A1", "A3", "B1", "B3"], C3: ["A3", "B3", "D3", "E3", "F3", "G3", "H3", "I3", "C1", "C2", "C4", "C5", "C6", "C7", "C8", "C9", "A1", "A2", "B1", "B2"], C4: ["A4", "B4", "D4", "E4", "F4", "G4", "H4", "I4", "C1", "C2", "C3", "C5", "C6", "C7", "C8", "C9", "A5", "A6", "B5", "B6"], C5: ["A5", "B5", "D5", "E5", "F5", "G5", "H5", "I5", "C1", "C2", "C3", "C4", "C6", "C7", "C8", "C9", "A4", "A6", "B4", "B6"], C6: ["A6", "B6", "D6", "E6", "F6", "G6", "H6", "I6", "C1", "C2", "C3", "C4", "C5", "C7", "C8", "C9", "A4", "A5", "B4", "B5"], C7: ["A7", "B7", "D7", "E7", "F7", "G7", "H7", "I7", "C1", "C2", "C3", "C4", "C5", "C6", "C8", "C9", "A8", "A9", "B8", "B9"], C8: ["A8", "B8", "D8", "E8", "F8", "G8", "H8", "I8", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C9", "A7", "A9", "B7", "B9"], C9: ["A9", "B9", "D9", "E9", "F9", "G9", "H9", "I9", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "A7", "A8", "B7", "B8"], D1: ["A1", "B1", "C1", "E1", "F1", "G1", "H1", "I1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "E2", "E3", "F2", "F3"], D2: ["A2", "B2", "C2", "E2", "F2", "G2", "H2", "I2", "D1", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "E1", "E3", "F1", "F3"], D3: ["A3", "B3", "C3", "E3", "F3", "G3", "H3", "I3", "D1", "D2", "D4", "D5", "D6", "D7", "D8", "D9", "E1", "E2", "F1", "F2"], D4: ["A4", "B4", "C4", "E4", "F4", "G4", "H4", "I4", "D1", "D2", "D3", "D5", "D6", "D7", "D8", "D9", "E5", "E6", "F5", "F6"], D5: ["A5", "B5", "C5", "E5", "F5", "G5", "H5", "I5", "D1", "D2", "D3", "D4", "D6", "D7", "D8", "D9", "E4", "E6", "F4", "F6"], D6: ["A6", "B6", "C6", "E6", "F6", "G6", "H6", "I6", "D1", "D2", "D3", "D4", "D5", "D7", "D8", "D9", "E4", "E5", "F4", "F5"], D7: ["A7", "B7", "C7", "E7", "F7", "G7", "H7", "I7", "D1", "D2", "D3", "D4", "D5", "D6", "D8", "D9", "E8", "E9", "F8", "F9"], D8: ["A8", "B8", "C8", "E8", "F8", "G8", "H8", "I8", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D9", "E7", "E9", "F7", "F9"], D9: ["A9", "B9", "C9", "E9", "F9", "G9", "H9", "I9", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "E7", "E8", "F7", "F8"], E1: ["A1", "B1", "C1", "D1", "F1", "G1", "H1", "I1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "D2", "D3", "F2", "F3"], E2: ["A2", "B2", "C2", "D2", "F2", "G2", "H2", "I2", "E1", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "D1", "D3", "F1", "F3"], E3: ["A3", "B3", "C3", "D3", "F3", "G3", "H3", "I3", "E1", "E2", "E4", "E5", "E6", "E7", "E8", "E9", "D1", "D2", "F1", "F2"], E4: ["A4", "B4", "C4", "D4", "F4", "G4", "H4", "I4", "E1", "E2", "E3", "E5", "E6", "E7", "E8", "E9", "D5", "D6", "F5", "F6"], E5: ["A5", "B5", "C5", "D5", "F5", "G5", "H5", "I5", "E1", "E2", "E3", "E4", "E6", "E7", "E8", "E9", "D4", "D6", "F4", "F6"], E6: ["A6", "B6", "C6", "D6", "F6", "G6", "H6", "I6", "E1", "E2", "E3", "E4", "E5", "E7", "E8", "E9", "D4", "D5", "F4", "F5"], E7: ["A7", "B7", "C7", "D7", "F7", "G7", "H7", "I7", "E1", "E2", "E3", "E4", "E5", "E6", "E8", "E9", "D8", "D9", "F8", "F9"], E8: ["A8", "B8", "C8", "D8", "F8", "G8", "H8", "I8", "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E9", "D7", "D9", "F7", "F9"], E9: ["A9", "B9", "C9", "D9", "F9", "G9", "H9", "I9", "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "D7", "D8", "F7", "F8"], F1: ["A1", "B1", "C1", "D1", "E1", "G1", "H1", "I1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "D2", "D3", "E2", "E3"], F2: ["A2", "B2", "C2", "D2", "E2", "G2", "H2", "I2", "F1", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "D1", "D3", "E1", "E3"], F3: ["A3", "B3", "C3", "D3", "E3", "G3", "H3", "I3", "F1", "F2", "F4", "F5", "F6", "F7", "F8", "F9", "D1", "D2", "E1", "E2"], F4: ["A4", "B4", "C4", "D4", "E4", "G4", "H4", "I4", "F1", "F2", "F3", "F5", "F6", "F7", "F8", "F9", "D5", "D6", "E5", "E6"], F5: ["A5", "B5", "C5", "D5", "E5", "G5", "H5", "I5", "F1", "F2", "F3", "F4", "F6", "F7", "F8", "F9", "D4", "D6", "E4", "E6"], F6: ["A6", "B6", "C6", "D6", "E6", "G6", "H6", "I6", "F1", "F2", "F3", "F4", "F5", "F7", "F8", "F9", "D4", "D5", "E4", "E5"], F7: ["A7", "B7", "C7", "D7", "E7", "G7", "H7", "I7", "F1", "F2", "F3", "F4", "F5", "F6", "F8", "F9", "D8", "D9", "E8", "E9"], F8: ["A8", "B8", "C8", "D8", "E8", "G8", "H8", "I8", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F9", "D7", "D9", "E7", "E9"], F9: ["A9", "B9", "C9", "D9", "E9", "G9", "H9", "I9", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "D7", "D8", "E7", "E8"], G1: ["A1", "B1", "C1", "D1", "E1", "F1", "H1", "I1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "H2", "H3", "I2", "I3"], G2: ["A2", "B2", "C2", "D2", "E2", "F2", "H2", "I2", "G1", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "H1", "H3", "I1", "I3"], G3: ["A3", "B3", "C3", "D3", "E3", "F3", "H3", "I3", "G1", "G2", "G4", "G5", "G6", "G7", "G8", "G9", "H1", "H2", "I1", "I2"], G4: ["A4", "B4", "C4", "D4", "E4", "F4", "H4", "I4", "G1", "G2", "G3", "G5", "G6", "G7", "G8", "G9", "H5", "H6", "I5", "I6"], G5: ["A5", "B5", "C5", "D5", "E5", "F5", "H5", "I5", "G1", "G2", "G3", "G4", "G6", "G7", "G8", "G9", "H4", "H6", "I4", "I6"], G6: ["A6", "B6", "C6", "D6", "E6", "F6", "H6", "I6", "G1", "G2", "G3", "G4", "G5", "G7", "G8", "G9", "H4", "H5", "I4", "I5"], G7: ["A7", "B7", "C7", "D7", "E7", "F7", "H7", "I7", "G1", "G2", "G3", "G4", "G5", "G6", "G8", "G9", "H8", "H9", "I8", "I9"], G8: ["A8", "B8", "C8", "D8", "E8", "F8", "H8", "I8", "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G9", "H7", "H9", "I7", "I9"], G9: ["A9", "B9", "C9", "D9", "E9", "F9", "H9", "I9", "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "H7", "H8", "I7", "I8"], H1: ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "I1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "G2", "G3", "I2", "I3"], H2: ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "I2", "H1", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "G1", "G3", "I1", "I3"], H3: ["A3", "B3", "C3", "D3", "E3", "F3", "G3", "I3", "H1", "H2", "H4", "H5", "H6", "H7", "H8", "H9", "G1", "G2", "I1", "I2"], H4: ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "I4", "H1", "H2", "H3", "H5", "H6", "H7", "H8", "H9", "G5", "G6", "I5", "I6"], H5: ["A5", "B5", "C5", "D5", "E5", "F5", "G5", "I5", "H1", "H2", "H3", "H4", "H6", "H7", "H8", "H9", "G4", "G6", "I4", "I6"], H6: ["A6", "B6", "C6", "D6", "E6", "F6", "G6", "I6", "H1", "H2", "H3", "H4", "H5", "H7", "H8", "H9", "G4", "G5", "I4", "I5"], H7: ["A7", "B7", "C7", "D7", "E7", "F7", "G7", "I7", "H1", "H2", "H3", "H4", "H5", "H6", "H8", "H9", "G8", "G9", "I8", "I9"], H8: ["A8", "B8", "C8", "D8", "E8", "F8", "G8", "I8", "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H9", "G7", "G9", "I7", "I9"], H9: ["A9", "B9", "C9", "D9", "E9", "F9", "G9", "I9", "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "G7", "G8", "I7", "I8"], I1: ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "G2", "G3", "H2", "H3"], I2: ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I1", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "G1", "G3", "H1", "H3"], I3: ["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I1", "I2", "I4", "I5", "I6", "I7", "I8", "I9", "G1", "G2", "H1", "H2"], I4: ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I1", "I2", "I3", "I5", "I6", "I7", "I8", "I9", "G5", "G6", "H5", "H6"], I5: ["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I1", "I2", "I3", "I4", "I6", "I7", "I8", "I9", "G4", "G6", "H4", "H6"], I6: ["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I1", "I2", "I3", "I4", "I5", "I7", "I8", "I9", "G4", "G5", "H4", "H5"], I7: ["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I1", "I2", "I3", "I4", "I5", "I6", "I8", "I9", "G8", "G9", "H8", "H9"], I8: ["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I1", "I2", "I3", "I4", "I5", "I6", "I7", "I9", "G7", "G9", "H7", "H9"], I9: ["A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "G7", "G8", "H7", "H8"]}),
       
        DIGITS: ({A1: "123456789", A2: "123456789", A3: "123456789", A4: "123456789", A5: "123456789", A6: "123456789", A7: "123456789", A8: "123456789", A9: "123456789", B1: "123456789", B2: "123456789", B3: "123456789", B4: "123456789", B5: "123456789", B6: "123456789", B7: "123456789", B8: "123456789", B9: "123456789", C1: "123456789", C2: "123456789", C3: "123456789", C4: "123456789", C5: "123456789", C6: "123456789", C7: "123456789", C8: "123456789", C9: "123456789", D1: "123456789", D2: "123456789", D3: "123456789", D4: "123456789", D5: "123456789", D6: "123456789", D7: "123456789", D8: "123456789", D9: "123456789", E1: "123456789", E2: "123456789", E3: "123456789", E4: "123456789", E5: "123456789", E6: "123456789", E7: "123456789", E8: "123456789", E9: "123456789", F1: "123456789", F2: "123456789", F3: "123456789", F4: "123456789", F5: "123456789", F6: "123456789", F7: "123456789", F8: "123456789", F9: "123456789", G1: "123456789", G2: "123456789", G3: "123456789", G4: "123456789", G5: "123456789", G6: "123456789", G7: "123456789", G8: "123456789", G9: "123456789", H1: "123456789", H2: "123456789", H3: "123456789", H4: "123456789", H5: "123456789", H6: "123456789", H7: "123456789", H8: "123456789", H9: "123456789", I1: "123456789", I2: "123456789", I3: "123456789", I4: "123456789", I5: "123456789", I6: "123456789", I7: "123456789", I8: "123456789", I9: "123456789"}),
       
        SQUARES_LENGTH: 81,
        UNITS_LENGTH: 3,
        PEERS_LENGTH: 20       
    },
        // Declaring the var, definition of cloneObject is in the bottom of this closure.
        cloneObject;
    
    sudoku.solver = {
        digits: {},
        
        /*
         Eliminate all the other digits (except d) from digits[s] and propagate.
         Return digits, except return False if a contradiction is detected.
        */
        assign: function (digits, square, digit) {
            var i, result,
                otherDigits = digits[square].replace(digit, ""),
                nOtherDigits = otherDigits.length;
                               
            for (i = 0; i < nOtherDigits; i++) {
                result = sudoku.solver.eliminate(digits, square, otherDigits[i]);
                if (!result) {
                    return false;
                }
            }
            
            return digits;
        },
       
        eliminate: function (digits, square, digit) {
            var result;               
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
                result = sudoku.solver.eliminatePeers(digits, square, digits[square]);
                if (!result) {
                    return false;
                }
            }
           
            // Check single candidate, and assign if found.
            sudoku.solver.assignSingleCandidate(digits, square, digit);
            
            // Check candidate lines, and eliminate if found.
            sudoku.solver.eliminateCandidateLines(digits, square, digit);
            
            return digits;
        },
        
        /*
            Eliminate a digit from all of the square's peers.
            If a square has been assigned a digit, that digit can not 
            exist in any of its' peers.
        */   
        eliminatePeers: function (digits, square, digit) {
            var s, result;
            
            for (s in sudoku.PEERS[square]) {
                if (sudoku.PEERS[square].hasOwnProperty(s)) {
                    result = sudoku.solver.eliminate(digits, sudoku.PEERS[square][s], digit);
                    if (!result) {
                        return false;
                    }
                }
            }
            
            return digits;        
        },
        
        /*
            After a digit has been eliminated, there is a chance that
            in the eliminated square's units, there is only a single square
            that the digit can be assigned.
        */        
        assignSingleCandidate: function (digits, square, digit) {
            var i, s, result, possible;

            for (i = 0; i < sudoku.UNITS_LENGTH; i++) {
                possible = [];
                for (s in sudoku.UNITS[square][i]) {
                    if (sudoku.UNITS[square][i].hasOwnProperty(s)) {
                        if (digits[sudoku.UNITS[square][i][s]].indexOf(digit) !== -1) {
                            possible.push(sudoku.UNITS[square][i][s]);
                        }
                    }
                }
                // Invalid input?
                if (possible.length === 0) {
                    return false;
                } else if (possible.length === 1 && possible[0] !== square) {
                    result = sudoku.solver.assign(digits, possible[0], digit);
                    if (!result) {
                        return false;
                    }
                }
            }
        
            return digits;
        },
        /*
            After a digit has been eliminated, there is a chance that inside that square's
            box unit, all possible squares for the digit ar in line horizontically or vertically.
            Even if it is impossible to know exactly where to assign the digit, we can eliminate the digit from
            all other squares in the horizontal/vertical unit of those squares.
            Example: http://www.palmsudoku.com/pages/techniques-3.php
        */
        eliminateCandidateLines: function (digits, square, digit) {
            var i, s, direction, unit,
                boxUnit = sudoku.UNITS[square][2],
                possibleSquares = {horizontal: [], vertical: []},
                possibleLines = {horizontal: [], vertical: []};
            
            
            // Determine the possible lines for this digit.
            for (i = 0; i < 3; i++) {
                possibleSquares = {horizontal: [], vertical: []};
                
                // Horizontal lines.
                for (j = 0; j < 3; j++) {
                    if (digits[boxUnit[i+j]].indexOf(digit) !== -1) {
                        possibleSquares.horizontal.push(boxUnit[i+j]);
                    }
                }
                
                if (possibleSquares.horizontal.length > 0) {
                    possibleLines.horizontal.push(possibleSquares.horizontal);
                } 
                
                // Vertical lines.
                for (j = 0; j < 9; j += 3) {
                    if (digits[boxUnit[i+j]].indexOf(digit) !== -1) {
                        possibleSquares.vertical.push(boxUnit[i+j]);
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
            direction = (possibleLines.horizontal.length === 1) ? "horizontal" : (possibleLines.vertical.length === 1) ? "vertical" : false;
            
            if (direction && possibleLines[direction][0].length > 1) {
                unit = (direction === "horizontal") ? sudoku.UNITS[possibleLines.horizontal[0][0]][1] : sudoku.UNITS[possibleLines.vertical[0][0]][0];
                for (s in unit) {
                    if (unit.hasOwnProperty(s) && possibleLines[direction][0].indexOf(unit[s]) === -1) {
                        sudoku.solver.eliminate(digits, unit[s], digit);
                    }
                }            
            }

            return digits;
        }
       
    };
   
    sudoku.solve = function (gridDigits) {
        // Get a new copy of the starting point.
        var s;
        sudoku.solver.digits = cloneObject(sudoku.DIGITS);
        
        // Try to assign digits from the grid.
        for (s in gridDigits) {
            if (gridDigits.hasOwnProperty(s)) {
                if (!sudoku.solver.assign(sudoku.solver.digits, s, gridDigits[s])) {
                    return false;
                }            
            }
        }
       
        return sudoku.solver.digits;   
    };

    sudoku.parseGrid = function () {
        var i, value,
            gridDigits = {},
            nodeList = global.document.querySelectorAll('table#sudoku tr td input'),
            nNodes = nodeList.length;
        
        // Get valid digits from grid and remove invalid.   
        for (i = 0; i < nNodes; i++) {
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
            nodeList = global.document.querySelectorAll('table#sudoku tr td input'),
            nNodes = nodeList.length;
        
        // Clear the grid first.
        sudoku.clearGrid();    
        
        for (i = 0; i < nNodes; i++) {
            if (digits.hasOwnProperty(nodeList[i].id) && digits[nodeList[i].id].length === 1) {
                gridDigits[nodeList[i].id] = nodeList[i].value = digits[nodeList[i].id];
            }
        }
        
        return gridDigits;    
    };
    
/*
    sudoku.populateGridFromHash = function () {
        return sudoku.populateGrid(eval("(" + global.document.location.hash.match(/^#\((.*?)\)/)[1] + ")"));
    };
*/
    
    sudoku.clearGrid = function () {
        var i,
            nodeList = global.document.querySelectorAll('table#sudoku tr td input'),
            nNodes = nodeList.length;
        
        for (i = 0; i < nNodes; i++) {
            nodeList[i].value = "";
        }
    };
    
    /*
        A utility functions to clone an Object.
        Used by sudoku.solve() in order to clone the starting digits into 
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
   
    global.sudoku = sudoku;
    return global.sudoku;
   
}(typeof window === 'undefined' ? this : window)); 