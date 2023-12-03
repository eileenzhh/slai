import math

def hex_to_rgb(hex_code):
    hex_code = hex_code.lstrip('#')
    return tuple(int(hex_code[i:i+2], 16) for i in (0, 2, 4))

def color_difference(color1, color2):
    r1, g1, b1 = hex_to_rgb(color1)
    r2, g2, b2 = hex_to_rgb(color2)

    diff = math.sqrt((r1 - r2)**2 + (g1 - g2)**2 + (b1 - b2)**2)
    return diff

def main():
    color_codes_1 = ["#B3E0C6", "#F98A26", "#165CAA", "#DEC7E6"]
    color_codes_2 = ["#76ADCB", "#9E7E41", "#2838C3", "#6C70BA", "#0786C5", "#8A7536", "#2F42CC", "#74572B", "#A1F3FF", "#8A6B33", "#0236EA", "#2979F2"]

    for i, code_1 in enumerate(color_codes_1):
        for j, code_2 in enumerate(color_codes_2):
            diff = color_difference(code_1, code_2)
            print(f"Difference between {code_1} and {code_2}: {diff}")

if __name__ == "__main__":
    main()
