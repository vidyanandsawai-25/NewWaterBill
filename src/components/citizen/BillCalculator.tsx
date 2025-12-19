import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "../ui/card";
import {
  Calculator,
  Droplet,
  MapPin,
  Zap,
  TrendingUp,
  BarChart3,
  RefreshCw,
  Sparkles,
  Info,
  IndianRupee,
  Building2,
  Factory,
  Home,
  Gauge,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function BillCalculator() {
  const [division, setDivision] = useState("");
  const [divisionCode, setDivisionCode] = useState("");
  const [section, setSection] = useState("");
  const [connectionCategory, setConnectionCategory] =
    useState("");
  const [connectionType, setConnectionType] = useState("");
  const [pipeSize, setPipeSize] = useState("");
  const [previousUnit, setPreviousUnit] = useState("");
  const [currentUnit, setCurrentUnit] = useState("");
  const [calculatedTax, setCalculatedTax] = useState<number>(0);
  const [consumption, setConsumption] = useState<number>(0);

  // Live calculation as user types
  useEffect(() => {
    if (previousUnit && currentUnit) {
      const prev = parseInt(previousUnit) || 0;
      const curr = parseInt(currentUnit) || 0;
      const cons = curr - prev;
      setConsumption(cons);

      let tax = 0;
      if (cons <= 100) {
        tax = cons * 8;
      } else if (cons <= 300) {
        tax = 100 * 8 + (cons - 100) * 12;
      } else if (cons <= 500) {
        tax = 100 * 8 + 200 * 12 + (cons - 300) * 18;
      } else {
        tax = 100 * 8 + 200 * 12 + 200 * 18 + (cons - 500) * 25;
      }

      setCalculatedTax(tax);
    } else {
      setCalculatedTax(0);
      setConsumption(0);
    }
  }, [previousUnit, currentUnit]);

  const handleReset = () => {
    setDivision("");
    setDivisionCode("");
    setSection("");
    setConnectionCategory("");
    setConnectionType("");
    setPipeSize("");
    setPreviousUnit("");
    setCurrentUnit("");
    setCalculatedTax(0);
    setConsumption(0);
  };

  // Rate breakdown calculation
  const getRateBreakdown = () => {
    if (consumption === 0) return [];
    const breakdown = [];

    if (consumption <= 100) {
      breakdown.push({
        range: "0-100",
        units: consumption,
        rate: 8,
        amount: consumption * 8,
      });
    } else if (consumption <= 300) {
      breakdown.push({
        range: "0-100",
        units: 100,
        rate: 8,
        amount: 800,
      });
      breakdown.push({
        range: "101-300",
        units: consumption - 100,
        rate: 12,
        amount: (consumption - 100) * 12,
      });
    } else if (consumption <= 500) {
      breakdown.push({
        range: "0-100",
        units: 100,
        rate: 8,
        amount: 800,
      });
      breakdown.push({
        range: "101-300",
        units: 200,
        rate: 12,
        amount: 2400,
      });
      breakdown.push({
        range: "301-500",
        units: consumption - 300,
        rate: 18,
        amount: (consumption - 300) * 18,
      });
    } else {
      breakdown.push({
        range: "0-100",
        units: 100,
        rate: 8,
        amount: 800,
      });
      breakdown.push({
        range: "101-300",
        units: 200,
        rate: 12,
        amount: 2400,
      });
      breakdown.push({
        range: "301-500",
        units: 200,
        rate: 18,
        amount: 3600,
      });
      breakdown.push({
        range: "500+",
        units: consumption - 500,
        rate: 25,
        amount: (consumption - 500) * 25,
      });
    }

    return breakdown;
  };

  const rateBreakdown = getRateBreakdown();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 px-4 py-6 max-w-[1800px] mx-auto mt-[60px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-slate-200">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
              Water Tax Calculator
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-2">
            Calculate your estimated water bill instantly with
            our smart calculator
          </p>
        </motion.div>

        {/* Three Input Cards in One Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
          {/* Location Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white border shadow-lg rounded-2xl overflow-hidden h-full">
              <div className="bg-gradient-to-r from-slate-400 to-slate-500 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white">
                      Location Details
                    </h3>
                    <p className="text-slate-100 text-xs">
                      Select your municipal division and ward
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="space-y-2">
                  <Label className="text-xs text-gray-700 flex items-center gap-1">
                    Municipal Division{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={division}
                    onValueChange={setDivision}
                  >
                    <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 rounded-lg transition-all">
                      <SelectValue placeholder="Select Division" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mumbai">
                        Mumbai
                      </SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="nagpur">
                        Nagpur
                      </SelectItem>
                      <SelectItem value="nashik">
                        Nashik
                      </SelectItem>
                      <SelectItem value="aurangabad">
                        Aurangabad
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-gray-700 flex items-center gap-1">
                    Division Code{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={divisionCode}
                    onValueChange={setDivisionCode}
                  >
                    <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 rounded-lg transition-all">
                      <SelectValue placeholder="Select Code" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a">
                        Division A
                      </SelectItem>
                      <SelectItem value="b">
                        Division B
                      </SelectItem>
                      <SelectItem value="c">
                        Division C
                      </SelectItem>
                      <SelectItem value="d">
                        Division D
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-gray-700 flex items-center gap-1">
                    Ward Section{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={section}
                    onValueChange={setSection}
                  >
                    <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 rounded-lg transition-all">
                      <SelectValue placeholder="Select Section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a-1">
                        Section A-1
                      </SelectItem>
                      <SelectItem value="a-2">
                        Section A-2
                      </SelectItem>
                      <SelectItem value="b-1">
                        Section B-1
                      </SelectItem>
                      <SelectItem value="b-2">
                        Section B-2
                      </SelectItem>
                      <SelectItem value="c-1">
                        Section C-1
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Connection Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white border shadow-lg rounded-2xl overflow-hidden h-full">
              <div className="bg-gradient-to-r from-blue-400 to-blue-500 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <Droplet className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white">
                      Connection Details
                    </h3>
                    <p className="text-blue-100 text-xs">
                      Specify your water connection type and
                      category
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="space-y-2">
                  <Label className="text-xs text-gray-700 flex items-center gap-1">
                    Connection Category{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={connectionCategory}
                    onValueChange={setConnectionCategory}
                  >
                    <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg transition-all">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meter">
                        <div className="flex items-center gap-2">
                          <Gauge className="w-4 h-4 text-green-600" />
                          <span>Metered</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="non-meter">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-orange-600" />
                          <span>Non-Metered</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-gray-700 flex items-center gap-1">
                    Connection Type{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={connectionType}
                    onValueChange={setConnectionType}
                  >
                    <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg transition-all">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-blue-600" />
                          <span>Residential</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="commercial">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-green-600" />
                          <span>Commercial</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="industrial">
                        <div className="flex items-center gap-2">
                          <Factory className="w-4 h-4 text-orange-600" />
                          <span>Industrial</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-gray-700 flex items-center gap-1">
                    Pipe Size{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={pipeSize}
                    onValueChange={setPipeSize}
                  >
                    <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg transition-all">
                      <SelectValue placeholder="Select Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">
                        ½ inch (15 mm)
                      </SelectItem>
                      <SelectItem value="0.75">
                        ¾ inch (20 mm)
                      </SelectItem>
                      <SelectItem value="1">
                        1 inch (25 mm)
                      </SelectItem>
                      <SelectItem value="1.5">
                        1½ inch (40 mm)
                      </SelectItem>
                      <SelectItem value="2">
                        2 inch (50 mm)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Meter Readings Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white border shadow-lg rounded-2xl overflow-hidden h-full">
              <div className="bg-gradient-to-r from-teal-400 to-teal-500 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white">
                      Meter Readings
                    </h3>
                    <p className="text-teal-100 text-xs">
                      Enter your previous and current readings
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="space-y-2">
                  <Label className="text-xs text-gray-700">
                    Previous Reading (units){" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={previousUnit}
                      onChange={(e) =>
                        setPreviousUnit(e.target.value)
                      }
                      placeholder="0"
                      className="h-14 text-2xl font-mono text-center border-2 border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 rounded-lg transition-all tabular-nums"
                    />
                    <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                      units
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-gray-700">
                    Current Reading (units){" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={currentUnit}
                      onChange={(e) =>
                        setCurrentUnit(e.target.value)
                      }
                      placeholder="0"
                      className="h-14 text-2xl font-mono text-center border-2 border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 rounded-lg transition-all tabular-nums"
                    />
                    <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                      units
                    </div>
                  </div>
                </div>

                {consumption > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-3 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg border border-teal-200"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-3 h-3 text-teal-600" />
                      <span className="text-xs text-teal-900">
                        Total Consumption
                      </span>
                    </div>
                    <div className="text-2xl text-teal-600 font-mono tabular-nums">
                      {consumption}{" "}
                      <span className="text-sm">units</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Results Section Below */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Calculation Result Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 border-0 shadow-2xl rounded-2xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    <span className="text-white/80">
                      Estimated Bill
                    </span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>

                <motion.div
                  key={calculatedTax}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <div className="text-white/60 text-sm mb-1">
                    Total Amount
                  </div>
                  <div className="text-5xl text-white font-mono tabular-nums flex items-start gap-1">
                    <IndianRupee className="w-8 h-8 mt-2" />
                    <span>{calculatedTax.toFixed(2)}</span>
                  </div>
                </motion.div>

                {consumption > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Info className="w-4 h-4 text-white/80" />
                      <span className="text-white/80 text-sm">
                        Rate Breakdown
                      </span>
                    </div>

                    {rateBreakdown.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white/70 text-xs">
                            {item.range} units
                          </span>
                          <span className="text-white text-sm font-mono">
                            ₹{item.amount}
                          </span>
                        </div>
                        <div className="text-white/60 text-xs">
                          {item.units} units × ₹{item.rate}/unit
                        </div>
                      </motion.div>
                    ))}

                    <div className="h-px bg-white/20 my-3" />

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                      <div className="flex items-center justify-between">
                        <span className="text-white">
                          Final Amount
                        </span>
                        <span className="text-xl text-white font-mono">
                          ₹{calculatedTax.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {consumption === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                      <Calculator className="w-8 h-8 text-white/60" />
                    </div>
                    <p className="text-white/60 text-sm">
                      Enter meter readings to calculate your
                      bill
                    </p>
                  </div>
                )}
              </div>

              {/* Reset Button */}
              <div className="px-6 pb-6">
                <Button
                  onClick={handleReset}
                  className="w-full h-12 bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 backdrop-blur-sm rounded-xl transition-all"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset Calculator
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Rate Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white border shadow-lg rounded-2xl p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-slate-600" />
                <h4 className="text-slate-900">
                  Rate Slabs Information
                </h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-gray-700">
                    0 - 100 units
                  </span>
                  <span className="text-slate-600 font-mono">
                    ₹8/unit
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-gray-700">
                    101 - 300 units
                  </span>
                  <span className="text-blue-600 font-mono">
                    ₹12/unit
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg border border-teal-200">
                  <span className="text-gray-700">
                    301 - 500 units
                  </span>
                  <span className="text-teal-600 font-mono">
                    ₹18/unit
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <span className="text-gray-700">
                    500+ units
                  </span>
                  <span className="text-orange-600 font-mono">
                    ₹25/unit
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-gray-600">
                    <p className="mb-2">
                      Water charges are calculated based on
                      consumption slabs. Higher consumption
                      results in higher per-unit rates.
                    </p>
                    <p>
                      All rates are inclusive of applicable
                      taxes and charges.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}