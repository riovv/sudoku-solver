/*jslint white: true, devel: true, onevar: true, browser: true, undef: true, nomen: true, regexp: true, continue: true, windows: true, newcap: true, maxerr: 50, indent: 4 */
sudoku.test = {
    grids : {
        easy: {
                project_euler_1: ({A3: "3", A5: "2", A7: "6", B1: "9", B4: "3", B6: "5", B9: "1", C3: "1", C4: "8", C6: "6", C7: "4", D3: "8", D4: "1", D6: "2", D7: "9", E1: "7", E9: "8", F3: "6", F4: "7", F6: "8", F7: "2", G3: "2", G4: "6", G6: "9", G7: "5", H1: "8", H4: "2", H6: "3", H9: "9", I3: "5", I5: "1", I7: "3"}),
                project_euler_2: ({A1: "2", A5: "8", A7: "3", B2: "6", B5: "7", B8: "8", B9: "4", C2: "3", C4: "5", C7: "2", C9: "9", D4: "1", D6: "5", D7: "4", D9: "8", F1: "4", F3: "2", F4: "7", F6: "6", G1: "3", G3: "1", G6: "7", G8: "4", H1: "7", H2: "2", H5: "4", H8: "6", I3: "4", I5: "1", I9: "3"}),
                project_euler_3: ({A7: "9", A9: "7", B4: "4", B5: "2", B7: "1", B8: "8", C4: "7", C6: "5", C8: "2", C9: "6", D1: "1", D4: "9", D6: "4", E2: "5", E8: "4", F4: "5", F6: "7", F9: "9", G1: "9", G2: "2", G4: "1", G6: "8", H2: "3", H3: "4", H5: "5", H6: "9", I1: "5", I3: "7"}),
                svd_1: ({A1: "6", A2: "5", A3: "4", A5: "3", A7: "1", B5: "7", B7: "5", B8: "9", C1: "1", C3: "7", C5: "8", C8: "2", C9: "3", D3: "5", D6: "8", E1: "3", E2: "2", E7: "4", E8: "6", E9: "8", F4: "9", F5: "2", F7: "7", F8: "1", F9: "5", G1: "8", G4: "3", G9: "6", H1: "9", H4: "7", H5: "6", H6: "1", H8: "5", I1: "5", I3: "2", I6: "4"})
        },
        medium: {},
        hard: {},
        sm: {
            SM_1: ({A1:"6", A2:"7", A6:"1", B1:"3", B6:"9", B8:"8", B9:"6", C5:"8", D3:"7", D4:"1", D7:"9", D9:"3", E5:"4", F1:"8", F3:"5", F6:"6", F7:"4", G5:"6", H1:"9", H2:"4", H4:"2", H9:"7", I4:"7", I8:"4", I9:"1"}),
            SM_2: ({A4:"9", A5:"1", A8:"3", B2:"6", B6:"2", B7:"7", B9:"9", D1:"4", D3:"7", D4:"5", D8:"1", F2:"9", F6:"3", F7:"8", F9:"2", H1:"9", H3:"3", H4:"8", H8:"2", I2:"5", I5:"4", I6:"6"}),
            SM_3: ({A4:"7", A9:"5", B2:"1", B7:"4", C3:"6", C5:"8", D4:"6", D7:"2", D9:"7", E2:"9", E8:"8", F1:"3", F3:"5", F6:"4", G5:"2", G7:"1", H3:"4", H8:"3", I1:"7", I6:"9"}),
            SM_4: ({A3:"9", A4:"4", A7:"3", B2:"2", B8:"1", C1:"4", C3:"8", C7:"7", C9:"5", D2:"5", D5:"7", D6:"6", E4:"3", E6:"9", F4:"2", F5:"8", F8:"7", G1:"7", G3:"1", G7:"2", G9:"8", H2:"8", H8:"5", I3:"6", I6:"3", I7:"1"}),
            SM_5: ({A1:"3", A5:"1", A8:"5", B2:"5", B7:"1", C4:"2", C5:"4", C8:"3", C9:"8", D3:"1", D6:"2", D8:"4", D9:"7", E1:"2", E3:"9", E5:"8", E7:"5", F4:"7", G2:"2", G5:"5", G7:"6", H1:"7", H3:"3", H4:"6", H9:"5", I3:"5", I4:"1", I8:"7", I9:"4"}),
            SM_6: ({A4:"8", A6:"5", B3:"7", B7:"4", C2:"1", C5:"3", C8:"7", D3:"2", D7:"1", E2:"7", E5:"6", E8:"3", F3:"9", F7:"8", G2:"3", G5:"5", G8:"1", H3:"8", H7:"9", I4:"4", I6:"2"}),
            SM_7: ({A3:"6", A4:"5", A7:"8", B3:"9", B6:"4", B7:"2", C1:"8", C2:"7", C8:"4", C9:"9", D5:"8", D9:"3", E1:"4", E4:"1", E6:"3", E9:"2", F1:"6", F5:"5", G1:"3", G2:"5", G8:"9", G9:"8", H3:"4", H4:"9", H7:"1", I3:"1", I6:"5", I7:"3"}),
            SM_8: ({A1:"4", A3:"5", A5:"2", A8:"6", B2:"7", B6:"8", C2:"6", C5:"7", C9:"9", D3:"7", D6:"6", D7:"5", E3:"3", E7:"9", F3:"9", F4:"8", F7:"1", G1:"7", G5:"1", G8:"4", H4:"5", H8:"9", I2:"5", I5:"4", I7:"7", I9:"2"})
        },
        debug: {
            invalid: ({A1: "1", A2: "1"}),
            solved: ({A1: "6", A2: "5", A3: "4", A5: "3", A7: "1", B5: "7", B7: "5", B8: "9", C1: "1", C3: "7", C5: "8", C8: "2", C9: "3", D3: "5", D6: "8", E1: "3", E2: "2", E7: "4", E8: "6", E9: "8", F4: "9", F5: "2", F7: "7", F8: "1", F9: "5", G1: "8", G4: "3", G9: "6", H1: "9", H4: "7", H5: "6", H6: "1", H8: "5", I1: "5", I3: "2", I6: "4"}),
            failed: ({A1: "6", A2: "5", A3: "4", A5: "3", A7: "1", B5: "7", B7: "5", B8: "9", C1: "1", C3: "7", C5: "8", C8: "2", C9: "3", D3: "5", D6: "8", E1: "3", E2: "2", E7: "4", E8: "6", E9: "8", F4: "9", F5: "2", F7: "7", F8: "1", F9: "5", G1: "8"}),
            candidateLines: ({A3:"1", A4:"9", A5:"5", A6:"7", A8:"6", A9:"3", B4:"8", B6:"6", B8:"7", C1:"7", C2:"6", C3:"9", C4:"1", C5:"3", C7:"8", C9:"5", D3:"7", D4:"2", D5:"6", D6:"1", D7:"3", D8:"5", E1:"3", E2:"1", E3:"2", E4:"4", E5:"9", E6:"5", E7:"7", E8:"8", E9:"6", F2:"5", F3:"6", F4:"3", F5:"7", F6:"8", G1:"1", G3:"8", G4:"6", G6:"9", G7:"5", G9:"7", H2:"9", H4:"7", H5:"1", H7:"6", H9:"8", I1:"6", I2:"7", I3:"4", I4:"5", I5:"8", I6:"3"})
        }
    },
    
    timer: {
        times: {},
        start: function (label) {  
            this.times[label] = {start: new Date().getTime(), stop: null};
            
            return this.times[label].start;
        },
        stop: function (label) {
            if (!this.times.hasOwnProperty(label)) {
                return false;
            }
            
            this.times[label].stop = new Date().getTime(); 
            
            return this.elapsed(label);
        },
        elapsed: function (label) {
            if (!this.times.hasOwnProperty(label)) {
                return false;
            }
            
            return (this.times[label].stop) ? 
                (this.times[label].stop - this.times[label].start) / 1000 :  
                (new Date().getTime() - this.times[label].start) / 1000;
        }
        
    },
    
    runTest: function (gridDigits, label) {
        var elapsed, gridDigits, digits,
            nSolvedSquares = 0,
            possibleSolutions = 1,
            lable = label || "Unnamed",
            logString = "%c" + label + ": ",
            logStyle = "color: white; ";
        
        // Populate the grid with the original grid digits.
        sudoku.populateGrid(gridDigits);
        
        sudoku.test.timer.start("runTest");      
        digits = sudoku.solver.run(gridDigits);
        elapsed = sudoku.test.timer.stop("runTest");
        
        // Test was not able to finnish, invalid?
        if (gridDigits === false) {
            logString += "[INVALID]";
            logStyle += "background-color: red";
            console.log(logString, logStyle);
            
            return false;
        }
        

        // Populate grid with the solved values.
        gridDigits = sudoku.populateGrid(digits);
        
        // Log result
        nSolvedSquares = Object.keys(gridDigits).length;
        logString += ((nSolvedSquares === 81) ? "[SOLVED]" : "[FAILED] " + nSolvedSquares + "/81") + " in " + elapsed + "s ";
        logStyle += "background-color: " + ((nSolvedSquares === 81) ? "green" : "orange");
        
        // If it was unsuccessful, calculate the number of possible solutions left.
        if (nSolvedSquares !== 81) {
            for (s in digits) {
                if (digits.hasOwnProperty(s)) {
                    if (digits[s].length > 1) {
                        possibleSolutions *= digits[s].length;
                    }
                }
            }
            logString += "with " + possibleSolutions + " possible solutions left";
        }
        
        console.log(logString, logStyle);
        
        
        return {squares: nSolvedSquares, time: elapsed};
    },

    runGroupTest: function (groupLabel) {
        var test, result,
            totalTime = 0,
            solved = [],
            failed = [],
            invalid = [];
                        
        if (!sudoku.test.grids.hasOwnProperty(groupLabel)) {
            return false;
        }
        
        // Log header
        console.log("%c" + groupLabel, "color: white; background-color: black; font-weight: bold");
        
        // Run all tests.
        for (test in sudoku.test.grids[groupLabel]) {
            if (sudoku.test.grids[groupLabel].hasOwnProperty(test)) {
                result = sudoku.test.runTest(sudoku.test.grids[groupLabel][test], test);
                if (result.hasOwnProperty("squares")) {
                    if (result.squares === 81) {
                        solved.push(result);
                    } else {
                        failed.push(result);
                    }
                    totalTime += result.time;
                } else {
                    invalid.push(result);
                }
            }
        }

         // Log a summary of the group test
        console.log("%cSUMMARY (total time: " + totalTime + "s)", "color: white; background-color: #000099;");

        if (invalid.length > 0) {
            console.log("%c" + invalid.length + " [INVALID]", "color: white; background-color: red;");
        }
        
        if (solved.length > 0) {
            console.log("%c" + solved.length + " [SOLVED]", "color: white; background-color: green;");
        }
        
        if (failed.length > 0) {
            console.log("%c" + failed.length + " [FAILED]", "color: white; background-color: orange;");
        }
        
        return;
    }
};